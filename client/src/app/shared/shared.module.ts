// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// pipes
import { SHARED_PIPES } from './pipes/index';

// components
import { SHARED_COMPONENTS } from './components/index';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS
  ],
  declarations: [
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
