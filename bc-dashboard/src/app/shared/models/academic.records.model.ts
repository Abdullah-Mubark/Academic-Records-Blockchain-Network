import {Student} from "./student.model";
import {Issuer} from "./issuer.model";
import {Course} from "./courses.model";

export class AacademicRecord{

      recordId: String;
      studentId: String;
      degree: String;
      gpa: String; 
      enrollmentDate: Date;
      graduationDate: Date;
      courses: Course[];
      student: Student;
      issuer: Issuer;

      constructor(
        studentId: String,
        degree: String,
        gpa: String, 
        enrollmentDate: Date,
        graduationDate: Date,
        courses: Course[],
        student: Student,
        issuer: Issuer){
            this.recordId = issuer.crNumber + "-" + studentId; 
            this.studentId = student.id; 
            this.degree = degree;
            this.gpa = gpa; 
            this.enrollmentDate = enrollmentDate;
            this.graduationDate = graduationDate;
            this.courses = courses;
            this.student = student;
            this.issuer = issuer;
        }
}