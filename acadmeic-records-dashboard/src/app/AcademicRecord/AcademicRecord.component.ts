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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AcademicRecordService } from './AcademicRecord.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-academicrecord',
  templateUrl: './AcademicRecord.component.html',
  styleUrls: ['./AcademicRecord.component.css'],
  providers: [AcademicRecordService]
})
export class AcademicRecordComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  recordId = new FormControl('', Validators.required);
  studentId = new FormControl('', Validators.required);
  degree = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  gpa = new FormControl('', Validators.required);
  graduationDate = new FormControl('', Validators.required);
  courses = new FormControl('', Validators.required);
  student = new FormControl('', Validators.required);
  issuer = new FormControl('', Validators.required);

  constructor(public serviceAcademicRecord: AcademicRecordService, fb: FormBuilder) {
    this.myForm = fb.group({
      recordId: this.recordId,
      studentId: this.studentId,
      degree: this.degree,
      status: this.status,
      gpa: this.gpa,
      graduationDate: this.graduationDate,
      courses: this.courses,
      student: this.student,
      issuer: this.issuer
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAcademicRecord.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'academic.records.network.AcademicRecord',
      'recordId': this.recordId.value,
      'studentId': this.studentId.value,
      'degree': this.degree.value,
      'status': this.status.value,
      'gpa': this.gpa.value,
      'graduationDate': this.graduationDate.value,
      'courses': this.courses.value,
      'student': this.student.value,
      'issuer': this.issuer.value
    };

    this.myForm.setValue({
      'recordId': null,
      'studentId': null,
      'degree': null,
      'status': null,
      'gpa': null,
      'graduationDate': null,
      'courses': null,
      'student': null,
      'issuer': null
    });

    return this.serviceAcademicRecord.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'recordId': null,
        'studentId': null,
        'degree': null,
        'status': null,
        'gpa': null,
        'graduationDate': null,
        'courses': null,
        'student': null,
        'issuer': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'academic.records.network.AcademicRecord',
      'studentId': this.studentId.value,
      'degree': this.degree.value,
      'status': this.status.value,
      'gpa': this.gpa.value,
      'graduationDate': this.graduationDate.value,
      'courses': this.courses.value,
      'student': this.student.value,
      'issuer': this.issuer.value
    };

    return this.serviceAcademicRecord.updateAsset(form.get('recordId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceAcademicRecord.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceAcademicRecord.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'recordId': null,
        'studentId': null,
        'degree': null,
        'status': null,
        'gpa': null,
        'graduationDate': null,
        'courses': null,
        'student': null,
        'issuer': null
      };

      if (result.recordId) {
        formObject.recordId = result.recordId;
      } else {
        formObject.recordId = null;
      }

      if (result.studentId) {
        formObject.studentId = result.studentId;
      } else {
        formObject.studentId = null;
      }

      if (result.degree) {
        formObject.degree = result.degree;
      } else {
        formObject.degree = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.gpa) {
        formObject.gpa = result.gpa;
      } else {
        formObject.gpa = null;
      }

      if (result.graduationDate) {
        formObject.graduationDate = result.graduationDate;
      } else {
        formObject.graduationDate = null;
      }

      if (result.courses) {
        formObject.courses = result.courses;
      } else {
        formObject.courses = null;
      }

      if (result.student) {
        formObject.student = result.student;
      } else {
        formObject.student = null;
      }

      if (result.issuer) {
        formObject.issuer = result.issuer;
      } else {
        formObject.issuer = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'recordId': null,
      'studentId': null,
      'degree': null,
      'status': null,
      'gpa': null,
      'graduationDate': null,
      'courses': null,
      'student': null,
      'issuer': null
      });
  }

}
