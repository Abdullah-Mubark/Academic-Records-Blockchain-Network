import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace academic.records.network{
   export class Citizen extends Participant {
      id: string;
      firstName: string;
      middleName: string;
      lastName: string;
      gender: string;
      birthDate: Date;
      records: AcademicRecord[];
   }
   export class Issuer extends Participant {
      crNumber: string;
      issuerName: string;
      type: IssuerType;
   }
   export class AcademicRecord extends Asset {
      recordId: string;
      studentId: string;
      degree: string;
      status: string;
      gpa: string;
      graduationDate: Date;
      courses: Course[];
      student: Citizen;
      issuer: Issuer;
   }
   export class Course {
      courseName: string;
      courseCode: string;
      courseGrade: string;
      courseHours: number;
   }
   export enum IssuerType {
      University,
      College,
      Academy,
      HighSchool,
      MiddleSchool,
      ElementrySchool,
   }
   export class AddRecord extends Transaction {
      person: Citizen;
      studentId: string;
      degree: string;
      status: string;
      gpa: string;
      graduationDate: Date;
      courses: Course[];
   }
   export class RemoveRecord extends Transaction {
      record: AcademicRecord;
   }
   export class EditRecord extends Transaction {
      record: AcademicRecord;
      degree: string;
      status: string;
      gpa: string;
      graduationDate: Date;
      courses: Course[];
   }
// }
