// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

// modules
import { SharedModule } from '../shared/shared.module';
import { TimingRoutingModule } from './timing-routing.module';

// reducers
import { reducers } from './reducers';

// components
import { TIMING_COMPONENTS } from './components/';
import { TIMING_CONTAINER_COMPONENTS } from './containers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TimingRoutingModule,

    StoreModule.forFeature('timing', reducers)
  ],
  declarations: [
    ...TIMING_COMPONENTS,
    ...TIMING_CONTAINER_COMPONENTS
  ]
})
export class TimingModule { }
