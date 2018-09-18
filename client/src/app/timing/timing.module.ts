// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { SharedModule } from '../shared/shared.module';
import { TimingRoutingModule } from './timing-routing.module';

// components
import { TIMING_COMPONENTS } from './components/';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TimingRoutingModule
  ],
  declarations: [
    ...TIMING_COMPONENTS
  ]
})
export class TimingModule { }
