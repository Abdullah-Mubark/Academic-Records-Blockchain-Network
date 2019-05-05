import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AacademicRecord } from "../models/academic.records.model";
import { Student, Gender } from "../models/student.model";
import { Course } from "../models/courses.model";
import { Issuer, IssuerType } from "../models/issuer.model";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AcademicRecordsService {

    private RecordsList: AacademicRecord[] = [];

    constructor(private http: HttpClient) { }

    // getRecords(id: number) {
    //     return this.http.get("http://localhost:3000/api/queries/selectAllRecords");
    // }

    getAllRecords() {
        return this.http.get("http://localhost:3000/api/queries/selectAllRecords");
    }

    getStudentInfo(id: number) {
        return this.http.get("http://localhost:3000/api/Citizen/" + id)
    }

    populateRecords() {
        let student = new Student("1091935815", "Abdullah", "Waleed", "Almubark", Gender.Male, new Date(2 / 4 / 2014));
        let courses = [
            new Course("Calculas II", "Math113", "A", 3),
            new Course("Introduction to Physics", "PHY101", "A+", 4),
            new Course("English letritrue", "ENG111", "B", 3),
            new Course("Arab letriture", "ARAB103", "C+", 2)
        ];
        let IssuerA = new Issuer("100000000", "Prince Sultan University", IssuerType.University);
        let IssuerB = new Issuer("100000001", "King Saud University", IssuerType.University);

        let recordA = new AacademicRecord("214110377",
            "Master in Cyper Security",
            "2.4",
            new Date(2 / 4 / 2014),
            new Date(3 / 5 / 2019),
            courses,
            student, IssuerB);

        let recordB = new AacademicRecord("214110377",
            "Bachelor in Software Engineering",
            "3.2",
            new Date(2 / 4 / 2014),
            new Date(3 / 5 / 2019),
            courses,
            student, IssuerA);

        this.RecordsList.push(recordA);
        this.RecordsList.push(recordB);
    }


    populateNetwork() {
        //Set up data 
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        //IssuerA
        let issuerA_Body = {
            '$class': "academic.records.network.Issuer",
            'crNumber': "7000000000",
            'issuerName': "King Saud University",
            'type': "University"
        };
        //IssuerB
        let issuerB_Body = {
            '$class': "academic.records.network.Issuer",
            'crNumber': "7000000001",
            'issuerName': "Prince Sultan University",
            'type': "University"
        };
        //StudentA
        let StudentA = {
            "$class": "academic.records.network.Citizen",
            "id": "1091935815",
            "firstName": "abdullah",
            "middleName": "waleed",
            "lastName": "almubark",
            "gender": "Male",
            "birthDate": "2019-02-24T00:00:00.000Z",
        };
        //StudentB
        let StudentB = {
            "$class": "academic.records.network.Citizen",
            "id": "1080032142",
            "firstName": "maan",
            "middleName": "khalid",
            "lastName": "alklewi",
            "gender": "Male",
            "birthDate": "2000-02-24T00:00:00.000Z",
        };
        //StudentC
        let StudentC = {
            "$class": "academic.records.network.Citizen",
            "id": "1114912344",
            "firstName": "noora",
            "middleName": "saad",
            "lastName": "alaqeel",
            "gender": "Female",
            "birthDate": "1980-02-24T00:00:00.000Z",
        };
        //RecordA
        let RecordA = {
            "$class": "academic.records.network.AddRecordByAdmin",
            "issuer": "resource:academic.records.network.Issuer#7000000000",
            "person": "resource:academic.records.network.Citizen#1091935815",
            "studentId": "214110377",
            "degree": "Bachelor in Software engineering",
            "gpa": "2.5/4",
            "enrollmentDate": "2014-08-20T12:21:31.465Z",
            "graduationDate": "2019-02-24T10:05:32.845Z",
            "courses": [
                {
                    "$class": "academic.records.network.Course",
                    "courseName": "Calculas",
                    "courseCode": "MATH123",
                    "courseGrade": "B+",
                    "courseHours": 3
                },
                {
                    "$class": "academic.records.network.Course",
                    "courseName": "Arabic litrtire",
                    "courseCode": "Arab332",
                    "courseGrade": "C-",
                    "courseHours": 3
                }
            ]
        };
        //RecordB
        let RecordB = {
            "$class": "academic.records.network.AddRecordByAdmin",
            "issuer": "resource:academic.records.network.Issuer#7000000001",
            "person": "resource:academic.records.network.Citizen#1091935815",
            "studentId": "412321333",
            "degree": "Master in Cyper Security",
            "gpa": "3.5/5",
            "enrollmentDate": "2019-08-20T12:21:31.465Z",
            "graduationDate": "2021-02-24T10:05:32.845Z",
            "courses": []
        };


        // Invoke Issuer API 
        this.DisplayResult(this.http.post("http://localhost:3000/api/Issuer", issuerA_Body, { headers: headers }), "Issuer A");
        this.DisplayResult(this.http.post("http://localhost:3000/api/Issuer", issuerB_Body, { headers: headers }), "Issuer B");

        // Invoke Citizen API
        this.DisplayResult(this.http.post("http://localhost:3000/api/Citizen", StudentA, { headers: headers }), "Citizen A");
        this.DisplayResult(this.http.post("http://localhost:3000/api/Citizen", StudentB, { headers: headers }), "Citizen B");
        this.DisplayResult(this.http.post("http://localhost:3000/api/Citizen", StudentC, { headers: headers }), "Citizen C");

        // Invoke add records API
        this.DisplayResult(this.http.post("http://localhost:3000/api/AddRecordByAdmin", RecordA, { headers: headers }), "First Record");
        this.DisplayResult(this.http.post("http://localhost:3000/api/AddRecordByAdmin", RecordB, { headers: headers }), "Second Record");
    }

    DisplayResult(response: Observable<Object>, message: string) {
        response.subscribe(data => {
            console.log(message);
            console.log(data);
        })
    }
}   