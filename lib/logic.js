/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * @param {academic.records.network.AddRecord} addRecord
 * @transaction
 */
async function AddRecord(tx) {
    //Get Transaction Sender  
    let currentParticipant = getCurrentParticipant();
    //Get Record list 
    let recordsList = tx.person.records;
    
    //Setup record values
    let recordId = currentParticipant.crNumber + "-" + tx.studentId;
    let studentId = tx.studentId;
    let degree = tx.degree;
    let status = tx.status;
    let gpa = tx.gpa;
    let student = tx.person;
    let issuer = currentParticipant;
    let graduationDate = tx.graduationDate;
    let courses = tx.courses;

    //Get the factory.
    var factory = getFactory();
    //Create a new record.
    var newRecord = factory.newResource('academic.records.network', 'AcademicRecord', recordId);
    //Set the properties of the new record.
    newRecord.studentId = studentId;
    newRecord.degree = degree;
    newRecord.status = status;
    newRecord.gpa = gpa;
    newRecord.student = student;
    newRecord.issuer = issuer;
    //Check if optional parameters exist.
    if(courses) newRecord.courses = courses;
    if(graduationDate) newRecord.graduationDate = graduationDate;

    //Update citizen's record
    recordsList.push(newRecord);
    tx.person.records = recordsList;

    // Get the Citizen and Academic Record registries.
    const AcademicRecordRegistry = await getAssetRegistry('academic.records.network.AcademicRecord');
    const CitizenRegistry = await getParticipantRegistry('academic.records.network.Citizen');

    // Update the Citizen and Academic Record.
    await AcademicRecordRegistry.add(newRecord);
    await CitizenRegistry.update(tx.person);
}

/**
 * @param {academic.records.network.EditRecord} editRecord
 * @transaction
 */
async function EditRecord(tx) {
        //Get the Academic Record registry.
        const AcademicRecordRegistry = await getAssetRegistry('academic.records.network.AcademicRecord');

        //Get current record 
        let updatedRecord = await AcademicRecordRegistry.get(tx.record.recordId);

        // check if degree parameter was sent , if yes then update the value
        if(tx.degree) updatedRecord.degree = tx.degree;
        // check if status parameter was sent , if yes then update the value
        if(tx.status) updatedRecord.status = tx.status;
        // check if gpa parameter was sent , if yes then update the value
        if(tx.gpa) updatedRecord.gpa = tx.gpa;
        // check if courses parameter was sent , if yes then update the value
        if(tx.courses) updatedRecord.courses = tx.courses;
        // check if graduation date parameter was sent , if yes then update the value
        if(tx.graduationDate) updatedRecord.graduationDate = tx.graduationDate;
        
        //Update record
        await AcademicRecordRegistry.update(updatedRecord);   
}

/**
 * @param {academic.records.network.RemoveRecord} removeRecord
 * @transaction
 */
async function RemoveRecord(tx) {
    //Get citizen's record list 
    let recordsList = tx.record.student.records;

    //Remove record from list
    var index = recordsList.indexOf(tx.record);
    if (index !== -1) recordsList.splice(index, 1); 

    //Update citizen's record
    tx.record.student.records = recordsList;

    //Get the citizen and academic record registries.
    const AcademicRecordRegistry = await getAssetRegistry('academic.records.network.AcademicRecord');
    const CitizenRegistry = await getParticipantRegistry('academic.records.network.Citizen');

    //Update the citizen and remove the academic record.
    await AcademicRecordRegistry.remove(tx.record);
    await CitizenRegistry.update(tx.record.student);
}
