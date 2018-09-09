import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';

import { TimingComponent } from './timing.component';
import { SocketService } from './shared/services/socket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    TimingComponent
  ],
  providers: [SocketService]
})
export class TimingModule { }
