/**
 * Copyright 2012-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { NgModule, InjectionToken, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2Webstorage } from 'ngx-webstorage';

import { PrincipalService } from './services/principal.service';
import { TokenService } from './services/token.service';
import { TokenExchangeService } from './services/tokenExchange.service';
import { AuthConfig, IAuthConfig } from './config/auth-common.config';
import { EXT_REST_CONFIG, ExtRestConfig } from '../../common';

export const EXT_AUTH_CONFIG: InjectionToken<AuthConfig> = new InjectionToken<AuthConfig>(
  'extAuthCommon.config'
);

export function authFactory(restConf: ExtRestConfig, config: IAuthConfig): AuthConfig {
  return new AuthConfig(config);
}

export const AUTH_PROVIDER: Provider = {
  provide: AuthConfig,
  useFactory: authFactory,
  deps: [EXT_REST_CONFIG, EXT_AUTH_CONFIG]
};

/**
 * Common Login Module for authentication.
 * @author Randika Hapugoda
 */
@NgModule({
  imports: [CommonModule, Ng2Webstorage],
  providers: [TokenService, PrincipalService, TokenExchangeService]
})
export class ExtendzAuthCommonModule {
  static forRoot(config: IAuthConfig): ModuleWithProviders {
    return {
      ngModule: ExtendzAuthCommonModule,
      providers: [
        {
          provide: EXT_AUTH_CONFIG,
          useValue: config
        },
        AUTH_PROVIDER
      ]
    };
  } // forRoot()
}
