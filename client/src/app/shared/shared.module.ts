// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// pipes
import { SHARED_PIPES } from './pipes/index';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ...SHARED_PIPES
  ],
  declarations: [
    ...SHARED_PIPES
  ]
})
export class SharedModule { }
