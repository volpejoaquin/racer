// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// pipes
import { SHARED_PIPES } from './pipes/index';

// components
import { SHARED_COMPONENTS } from './components/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
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
