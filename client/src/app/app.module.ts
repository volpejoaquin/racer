// angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// libs
import { StoreModule } from '@ngrx/store';
import { DBModule } from '@ngrx/db';

// modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { TimingModule } from './timing/timing.module';
import { DataAcquisitionModule } from './data-acquisition/data-acquisition.module';
import { SharedModule } from './shared/shared.module';
import { DummyModule } from './dummy/dummy.module';

// components
import { AppComponent } from './app.component';

// database
import { schema } from './db';

// recuders
import { reducers, metaReducers } from './core/reducers';

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
    DataAcquisitionModule,

    SharedModule,

    DBModule.provideDB(schema),
    DummyModule,

    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
