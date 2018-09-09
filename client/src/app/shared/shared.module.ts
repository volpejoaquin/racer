import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

import { SHARED_PIPES } from './pipes/index';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    ...SHARED_PIPES
  ],
  declarations: [
    ...SHARED_PIPES
  ]
})
export class SharedModule { }
