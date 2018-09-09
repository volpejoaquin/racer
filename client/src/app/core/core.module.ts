// angular
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

// module
import { SharedModule } from './../shared/shared.module';

// services
import { CORE_SERVICES } from './service/index';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    CORE_SERVICES
  ]
})
export class CoreModule {
  // configuredProviders: *required to configure WindowService and ConsoleService per platform
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: configuredProviders
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded; Import in root module only.');
    }
  }
}
