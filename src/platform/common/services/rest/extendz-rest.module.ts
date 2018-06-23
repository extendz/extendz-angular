/**
 *    Copyright 2018 the original author or authors
 * 
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 * 
 *        http://www.apache.org/licenses/LICENSE-2.0
 * 
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { NgModule, ModuleWithProviders, InjectionToken, Provider } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExtRestConfig, IExtRestConfig } from './models';
import { DeleteDialogModule } from './dialog-delete/delete-dialog.module';
import { RestService } from './rest.service';

export const EXT_REST_CONFIG: InjectionToken<ExtRestConfig> = new InjectionToken<ExtRestConfig>(
  'extRest.config'
);

export function restFactory(config: IExtRestConfig): ExtRestConfig {
  return new ExtRestConfig(config);
}

export const REST_PROVIDER: Provider = {
  provide: ExtRestConfig,
  useFactory: restFactory,
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
export class ExtendzRestModule {
  static forRoot(config: IExtRestConfig): ModuleWithProviders {
    return {
      ngModule: ExtendzRestModule,
      providers: [
        {
          provide: EXT_REST_CONFIG,
          useValue: config
        },
        REST_PROVIDER
      ]
    };
  } // forRoot()
} // class
