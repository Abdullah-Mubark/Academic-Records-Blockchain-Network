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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AcademicRecordComponent } from './AcademicRecord/AcademicRecord.component';

import { CitizenComponent } from './Citizen/Citizen.component';
import { IssuerComponent } from './Issuer/Issuer.component';

import { AddRecordComponent } from './AddRecord/AddRecord.component';
import { RemoveRecordComponent } from './RemoveRecord/RemoveRecord.component';
import { EditRecordComponent } from './EditRecord/EditRecord.component';
import { AddRecordByAdminComponent } from './AddRecordByAdmin/AddRecordByAdmin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'AcademicRecord', component: AcademicRecordComponent },
  { path: 'Citizen', component: CitizenComponent },
  { path: 'Issuer', component: IssuerComponent },
  { path: 'AddRecord', component: AddRecordComponent },
  { path: 'RemoveRecord', component: RemoveRecordComponent },
  { path: 'EditRecord', component: EditRecordComponent },
  { path: 'AddRecordByAdmin', component: AddRecordByAdminComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
