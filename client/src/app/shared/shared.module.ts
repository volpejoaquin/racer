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

// icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far); // TODO REVIEW THIS

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    FontAwesomeModule
  ],
  declarations: [
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES
  ]
})
export class SharedModule { }
