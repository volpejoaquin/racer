// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// components
import { ADMIN_COMPONENTS } from './components/';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    ...ADMIN_COMPONENTS
  ]
})
export class AdminModule { }
