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

import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IExtendzApiConfig, ExtendzApiConfig } from './models';

export const EXT_API_CONFIG = new InjectionToken<ExtendzApiModule>('extApi.config');

export function provideApiConfig(config: IExtendzApiConfig): ExtendzApiConfig {
  return new ExtendzApiConfig(config);
}

@NgModule({
  imports: [CommonModule]
})
export class ExtendzApiModule {
  public static forRoot(config: IExtendzApiConfig): ModuleWithProviders {
    return {
      ngModule: ExtendzApiModule,
      providers: [
        {
          provide: EXT_API_CONFIG,
          useValue: config
        },
        {
          provide: ExtendzApiConfig,
          useFactory: provideApiConfig,
          deps: [EXT_API_CONFIG]
        }
      ]
    };
  } // forRoot()
} // class
