export class Student {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;


  constructor(id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    gender: Gender,
    birthDate: Date) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.gender = gender;
    this.birthDate = birthDate;
  }
}



export enum Gender {
  Male,
  Female
}