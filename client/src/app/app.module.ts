// angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { TimingModule } from './timing/timing.module';
import { DataAcquisitionModule } from './data-acquisition/data-acquisition.module';

// components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    AdminModule,
    TimingModule,
    DataAcquisitionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
