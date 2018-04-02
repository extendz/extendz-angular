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

import { NgModule, InjectionToken, Provider, ModuleWithProviders } from '@angular/core';
import { ModelMetaService } from './modelMeta.service';

import { ExtModelMetaConfig, IExtModelMetaConfig } from './models/extModelMeta.conf';
import { REST_PROVIDER, IExtRestConfig } from '../rest';
import { EXT_REST_CONFIG } from '../rest';

export const EXT_MODEL_META_CONFIG: InjectionToken<ExtModelMetaConfig> = new InjectionToken<
  ExtModelMetaConfig
>('extModelMeta.config');

export function modelMetaFactory(
  restConfig: IExtRestConfig,
  config: IExtModelMetaConfig
): ExtModelMetaConfig {
  return new ExtModelMetaConfig(config);
}

export const MODEL_META_PROVIDER: Provider = {
  provide: ExtModelMetaConfig,
  useFactory: modelMetaFactory,
  deps: [EXT_REST_CONFIG, EXT_MODEL_META_CONFIG]
};
/**
 * Base for Model meta module
 *
 * @author Randika Hapugoda
 */
@NgModule({
  providers: [ModelMetaService]
})
export class ExtendzModelMetaModule {
  static forRoot(config: IExtModelMetaConfig): ModuleWithProviders {
    return {
      ngModule: ExtendzModelMetaModule,
      providers: [
        {
          provide: EXT_MODEL_META_CONFIG,
          useValue: config
        },
        MODEL_META_PROVIDER
      ]
    };
  } // forRoot()
} // class
