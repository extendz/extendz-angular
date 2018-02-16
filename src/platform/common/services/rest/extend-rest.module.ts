import { NgModule, ModuleWithProviders, InjectionToken, Provider } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExtRestConfig, IExtRestConfig } from './models';
import { DeleteDialogModule } from './dialog-delete/delete-dialog.module';
import { RestService } from './rest.service';

export const EXT_REST_CONFIG: InjectionToken<ExtRestConfig> = new InjectionToken<ExtRestConfig>(
  'extRest.config'
);

export function httpFactory(config: IExtRestConfig): ExtRestConfig {
  return new ExtRestConfig(config);
}

export const HTTP_INTERCEPTOR_PROVIDER: Provider = {
  provide: ExtRestConfig,
  useFactory: httpFactory,
  deps: [EXT_REST_CONFIG]
};
/**
 * Base for REST module
 * @author Randika Hapugoda
 */
@NgModule({
  imports: [MatDialogModule, DeleteDialogModule],
  providers: [RestService]
})
export class ExtendRestModule {
  static forRoot(config: IExtRestConfig): ModuleWithProviders {
    return {
      ngModule: ExtendRestModule,
      providers: [
        {
          provide: EXT_REST_CONFIG,
          useValue: config
        },
        HTTP_INTERCEPTOR_PROVIDER
      ]
    };
  } // forRoot()
} // class
