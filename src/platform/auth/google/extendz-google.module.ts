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
import { MatButtonModule, MatIconModule } from '@angular/material';
import { CovalentLoadingModule } from '@covalent/core/loading';

import { GoogleService } from './google.service';
import { GoogleConf } from './models/google.conf';
import { GoogleComponent } from './google.component';

export const EXT_GOOGLE_CONFIG = new InjectionToken<ExtendzGoogleModule>('extGoogle.config');

@NgModule({
  imports: [MatIconModule, MatButtonModule, CovalentLoadingModule],
  declarations: [GoogleComponent],
  exports: [GoogleComponent],
  providers: [GoogleService]
})
export class ExtendzGoogleModule {
  public static forRoot(config: GoogleConf): ModuleWithProviders {
    return {
      ngModule: ExtendzGoogleModule,
      providers: [
        {
          provide: EXT_GOOGLE_CONFIG,
          useValue: config
        },
        {
          provide: GoogleConf,
          useFactory: provideGoogleConfig,
          deps: [EXT_GOOGLE_CONFIG]
        }
      ]
    };
  } // forRoot()
}

export function provideGoogleConfig(config: GoogleConf): GoogleConf {
  return config;
}
