export class Course {
    courseName: string;
    courseCode: string;
    courseGrade: string;
    courseHours: number;

    constructor(courseName: string,
        courseCode: string,
        courseGrade: string,
        courseHours: number) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.courseGrade = courseGrade;
        this.courseHours = courseHours;
    }
}
