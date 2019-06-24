/*
    helper module
*/
const _ = require('lodash');
const crypto = require('crypto');

const IDComparison = function(sourceObject, targetObject) {
  return sourceObject.id == targetObject.id;
};

const successMessage = function(successMessage) {
  return {
    'status': true,
    'message': successMessage,
  };
};

const generateHash = function(textToHash) {
  return (crypto.createHash('md5').update(textToHash).digest('hex'));
};

const errorMessage = function(errorCode, errorMessage) {
  return {
    'status': false,
    'error': errorCode,
    'message': errorMessage,
  };
};

const invalidArgumentLength = function(args, targetLength) {
  console.info('======= invalidArgumentLength ===== ');
  return args.length != targetLength;
};

const actionNotAllowedByUserForRoles = function(allowedRoles, callerUserRole) {
  console.info('======= actionNotAllowedByUserForRoles ===== ');
  return !_.includes(allowedRoles, callerUserRole);
};

const objectNotExist = function(objectBytes) {
  console.info('======= objectNotExist ===== ');
  if (objectBytes.toString()) {
    return false;
  }
  return true;
};

const getUserName = function(user) {
  return ((user.getID().split('::')[1]).split('/')[2]).split('=')[1];
};

const getUserOrg = function(user) {
  return user.getAttributeValue('org');
};

exports.invalidArgumentLength = invalidArgumentLength;
exports.actionNotAllowedByUserForRoles = actionNotAllowedByUserForRoles;
exports.objectNotExist = objectNotExist;
exports.IDComparison = IDComparison;
exports.errorMessage = errorMessage;
exports.generateHash = generateHash;
exports.getUserOrg = getUserOrg;
exports.getUserName = getUserName;
exports.successMessage = successMessage;
