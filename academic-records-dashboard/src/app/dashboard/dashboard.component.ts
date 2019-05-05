import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as Chartist from 'chartist';

import { AcademicRecordsService } from "../shared/services/academic.records.service";
import { AacademicRecord } from 'app/shared/models/academic.records.model';
import { Student } from 'app/shared/models/student.model';


declare var $: any;

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  SearchForm: FormGroup;
  RecordsList: AacademicRecord[];
  Student: Student;
  CoursesShowList: boolean[] = [];

  constructor(private fb: FormBuilder, private academicRecordsService: AcademicRecordsService, private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    //this.academicRecordsService.populateRecords();
    // this.RecordsList = this.academicRecordsService.getRecords(123);
    // this.Student = this.RecordsList[0].student;
    // console.log(this.RecordsList);
    // console.log(this.Student);
    const InputReg: string = "^[0-9]*[1-9][0-9]*$";
    // init searchform 
    this.SearchForm = this.fb.group({
      Id: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(InputReg)]]
    });

    // var dataSales = {
    //   labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
    //   series: [
    //      [287, 385, 490, 562, 594, 626, 698, 895, 952],
    //     [67, 152, 193, 240, 387, 435, 535, 642, 744],
    //     [23, 113, 67, 108, 190, 239, 307, 410, 410]
    //   ]
    // };

    // var optionsSales = {
    //   low: 0,
    //   high: 1000,
    //   showArea: true,
    //   height: "245px",
    //   axisX: {
    //     showGrid: false,
    //   },
    //   lineSmooth: Chartist.Interpolation.simple({
    //     divisor: 3
    //   }),
    //   showLine: true,
    //   showPoint: false,
    // };

    // var responsiveSales: any[] = [
    //   ['screen and (max-width: 640px)', {
    //     axisX: {
    //       labelInterpolationFnc: function (value) {
    //         return value[0];
    //       }
    //     }
    //   }]
    // ];

    // new Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


    // var data = {
    //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //   series: [
    //     [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
    //     [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
    //   ]
    // };

    // var options = {
    //     seriesBarDistance: 10,
    //     axisX: {
    //         showGrid: false
    //     },
    //     height: "245px"
    // };

    // var responsiveOptions: any[] = [
    //   ['screen and (max-width: 640px)', {
    //     seriesBarDistance: 5,
    //     axisX: {
    //       labelInterpolationFnc: function (value) {
    //         return value[0];
    //       }
    //     }
    //   }]
    // ];

    // new Chartist.Line('#chartActivity', data, options, responsiveOptions);

    // var dataPreferences = {
    //     series: [
    //         [25, 30, 20, 25]
    //     ]
    // };

    // var optionsPreferences = {
    //     donut: true,
    //     donutWidth: 40,
    //     startAngle: 0,
    //     total: 100,
    //     showLabel: false,
    //     axisX: {
    //         showGrid: false
    //     }
    // };

    // new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

    // new Chartist.Pie('#chartPreferences', {
    //   labels: ['62%','32%','6%'],
    //   series: [62, 32, 6]
    // });
  }

  onSubmit() {
    // console.log(this.SearchForm);
    // console.log(this.academicRecordsService.getRecords(this.SearchForm.value.Id));
    const id = this.SearchForm.value.Id;
    console.log(this.academicRecordsService.getRecords(id));
    //console.log(this.academicRecordsService.getRecords(id));
  }

  getStudentFullName() {
    let FullName: string;
    try {
      FullName = this.Student.firstName + " " + this.Student.middleName + " " + this.Student.lastName;
    }
    catch (e) {
      console.error("No Record exists, so student value is null");
    }
    return FullName;
  }

  // ToggleList(id:number){
  //   var button = document.getElementById('Table-Button:Record#' + id);
  //   var table = document.getElementById('Courses-Table:Record#' + id);

  //   this.CoursesShowList[id] = !this.CoursesShowList[id];
  //   console.log(button);
  //   console.log(table);

  // }

}