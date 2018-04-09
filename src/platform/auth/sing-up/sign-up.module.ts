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
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatIconModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { SignUpComponent } from './sign-up.component';
import { ISingUpConfig, SingUpConfig } from './models/singUp.config';
import { ExtendPipesModule } from '../../common/pipes';
import { ExtendzFormGroup } from './formGroup';
import { ExtendzFormBuilder } from './formBuilder';
import { ExtendzRestModule, EXT_REST_CONFIG, ExtRestConfig } from '../../common/services';
import { SingUpService } from './sign-up.service';

export const EXT_SINGUP_CONFIG = new InjectionToken<ExtendzSignUpModule>('extSignUp.config');

export function singUpFactory(restconfig: ExtRestConfig, config: ISingUpConfig): SingUpConfig {
  return new SingUpConfig(config);
}

export const SIGNUP_PROVIDER: Provider = {
  provide: SingUpConfig,
  useFactory: singUpFactory,
  deps: [EXT_REST_CONFIG, EXT_SINGUP_CONFIG]
};

@NgModule({
  imports: [
    CommonModule,
    ExtendzRestModule,
    ExtendPipesModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    //Material
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ExtendzFormGroup, ExtendzFormBuilder, SingUpService],
  declarations: [SignUpComponent],
  exports: [SignUpComponent]
})
export class ExtendzSignUpModule {
  public static forRoot(config: ISingUpConfig): ModuleWithProviders {
    return {
      ngModule: ExtendzSignUpModule,
      providers: [
        {
          provide: EXT_SINGUP_CONFIG,
          useValue: config
        },
        SIGNUP_PROVIDER
      ]
    };
  } // forRoot()
}
