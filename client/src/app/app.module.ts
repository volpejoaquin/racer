// angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeESAR from '@angular/common/locales/es-AR';

// libs
import { StoreModule } from '@ngrx/store';
import { DBModule } from '@ngrx/db';

// modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { TimingModule } from './timing/timing.module';
import { SharedModule } from './shared/shared.module';
import { DummyModule } from './dummy/dummy.module';

// components
import { AppComponent } from './app.component';

// database
import { schema } from './db';

// recuders
import { reducers, metaReducers } from './core/reducers';

const language = 'es-AR';

// the second parameter 'es-AR' is optional
registerLocaleData(localeESAR, language);

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

    SharedModule,

    DBModule.provideDB(schema),
    DummyModule,

    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: language }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
