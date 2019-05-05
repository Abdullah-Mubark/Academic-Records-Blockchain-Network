import { HttpClient } from '@angular/common/http';
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

    getRecords(id: number) {
        return this.http.get("http://localhost:3000/api/queries/selectAllRecords").subscribe(record => {
            return record;
        });

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
        //IssuerA
        let issuerA_Body = new URLSearchParams();
        issuerA_Body.append('$class', "academic.records.network.Issuer");
        issuerA_Body.append('crNumber', "7000000000");
        issuerA_Body.append('issuerName', "King Saud University");
        issuerA_Body.append('type', "University");
        //IssuerB
        let issuerB_Body = new URLSearchParams();
        issuerB_Body.append('$class', "academic.records.network.Issuer");
        issuerB_Body.append('crNumber', "7000000001");
        issuerB_Body.append('issuerName', "Prince Sultan University");
        issuerB_Body.append('type', "University");


        this.DisplayResult(this.http.post("http://localhost:3000/api/Issuer", issuerA_Body),"Issuer A");
        this.DisplayResult(this.http.post("http://localhost:3000/api/Issuer", issuerB_Body),"Issuer B");
    }

    DisplayResult(response :Observable<Object>, name: string){
        response.subscribe(data =>{
            console.log(name);
            console.log(data);
        })
    }
}   