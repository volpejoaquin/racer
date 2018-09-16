// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { SharedModule } from '../shared/shared.module';

// components
import { DATA_ACQUISITION_COMPONENTS } from './components/';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ...DATA_ACQUISITION_COMPONENTS
  ]
})
export class DataAcquisitionModule { }
