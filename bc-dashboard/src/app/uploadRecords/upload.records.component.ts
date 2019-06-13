import { Component, OnInit } from '@angular/core';

import { AcademicRecordsService } from '../shared/services/academic.records.service';

@Component({
    selector: 'uploadRecords-cmp',
    moduleId: module.id,
    templateUrl: 'upload.records.component.html'
})

export class UploadRecordsComponent implements OnInit {


    constructor(private academicRecordsService: AcademicRecordsService) { }

    ngOnInit() {
    }

    populateNetwork() {
        this.academicRecordsService.populateNetwork();
    }
}
