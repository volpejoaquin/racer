// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// pipes
import { SHARED_PIPES } from './pipes/index';

// components
import { SHARED_COMPONENTS } from './components/index';

// directives
import { SHARED_DIRECTIVES } from './directives/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES
  ],
  declarations: [
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES
  ]
})
export class SharedModule { }
