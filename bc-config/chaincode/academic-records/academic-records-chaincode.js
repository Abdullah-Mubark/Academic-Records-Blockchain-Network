/* eslint-disable comma-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

const shim = require('fabric-shim');
const _ = require('lodash');


const ERRORCODES = require('./error-codes.json');
const helper = require('./helper.js');

let user;
let callerUserRole = '';
let adminRole = '';

const AcademicRecordsChaincode = class {

  /**
  * constructor of the call , used to bind functions with THIS.
  */
  // constructor() {
  //   this.addAcademicRecord = this.addAcademicRecord.bind(this);
  //   this.updateAcademicRecord = this.updateAcademicRecord.bind(this);
  // }

  /**
  * This function is called when chaincode is instantantiated.
  * @param {stub} stub chaincode stub variable.
  * @return {shim.success} send shim response once instantiated.
  */
  async Init(stub) {
    console.info('========= Init=========');
    return shim.success();
  }

  /**
  * This function is called , everytime an invoke call is send to chaincode.
  * @param {stub} stub chaincode stub variable.
  * @return {shim.success} shim success or fail response.
  */
  async Invoke(stub) {
    const request = stub.getFunctionAndParameters();
    const method = this[request.fcn];

    console.info('\n============ ***** ===========');
    console.info('Request Received in AcademicRecordsChaincode:  ' + JSON.stringify(request));
    console.info('============ ***** ===========\n');

    try {
      this.setUerContext(stub);
      const payload = await method(stub, request.params);
      return shim.success(Buffer.from(JSON.stringify(payload)));
    } catch (err) {
      console.info(err);
      return shim.success(Buffer.from(JSON.stringify({ 'status': false, 'message': err })));
    }
  }


  /**
  * This function adds an academic record to the ledger.
  * @param {stub} stub chaincode stub variable.
  * @param {array} args request parameters.
  */
  async addAcademicRecord(stub, args) {
    console.info('========= addAcademicRecord =========');

    // Six argumenst : studentId, degree, gpa, studentInfo, enrollmentDate and graduationDate to be expected.
    if (helper.invalidArgumentLength(args, 6)) {
      return helper.errorMessage(ERRORCODES.ERROR_CODE_102, ERRORCODES.ERROR_DESC_102);
    }

    const allowedRoles = [adminRole];
    if (helper.actionNotAllowedByUserForRoles(allowedRoles, callerUserRole)) {
      return helper.errorMessage(ERRORCODES.ERROR_CODE_103, ERRORCODES.ERROR_DESC_103);
    }

    console.info(args);
    const studentId = args[0];
    const generatedAcademicRecordId = helper.getUserOrg(user) + ":" + studentId;

    await stub.putState(generatedAcademicRecordId, Buffer.from(JSON.stringify(args)));
    return helper.successMessage({ 'messsage': 'Successfully added academic record', 'academicRecordId': generatedAcademicRecordId });
  }


  /**
  * This function adds an academic record to the ledger.
  * @param {stub} stub chaincode stub variable.
  * @param {array} args request parameters.
  */
  async getAcademicRecord(stub, args) {
    console.info('========= getAcademicRecord =========');

    // one argumenst : academicRecordId to be expected.
    if (helper.invalidArgumentLength(args, 1)) {
      return helper.errorMessage(ERRORCODES.ERROR_CODE_102, ERRORCODES.ERROR_DESC_102);
    }

    const searchKey = args[0];
    const academicRecordBytes = await stub.getState(searchKey);
    if (!academicRecordBytes.toString()) {
      return helper.errorMessage(ERRORCODES.ERROR_CODE_101, ERRORCODES.ERROR_DESC_101);
    }
    return helper.successMessage(JSON.parse(academicRecordBytes));
  }

  /**
  * This function edits an academic record from the ledger.
  * @param {stub} stub chaincode stub variable.
  * @param {array} args request parameters.
  */
  async updateAcademicRecord(stub, args) {
  }


  /**
  * This function removes an academic record from the ledger.
  * @param {stub} stub chaincode stub variable.
  * @param {array} args request parameters.
  */
  async removeAcademicRecord(stub, args) {
  }


  /**
  * This fucntion sets user context , user who sends transaction to chaincode.
  * @param {stub} stub chaincode stub variable.
  */
  setUerContext(stub) {
    console.info('=== setUerContext ===');
    const ClientIdentity = shim.ClientIdentity;
    user = new ClientIdentity(stub);
    callerUserRole = user.getAttributeValue('role').toLowerCase();
    adminRole = user.getAttributeValue('org').toLowerCase() + 'admin';
    console.info(callerUserRole + '=== setUerContext ===' + adminRole);
  }
};

shim.start(new AcademicRecordsChaincode());