import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { KeycloakSignUpComponent } from './keycloak-sign-up.component';
import { KeycloakSignUpConfig } from './models/keycloak-singup.config';
import { MatButtonModule, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';

import { KeycloakSignUpService } from './keycloak-sign-up.service';

import { ExtendPipesModule } from '../../common/';
import { KeycloakConfig } from '../models';
import { FlexLayoutModule } from '@angular/flex-layout';

export const EXT_KEYCLOAK_SINGUP_CONFIG = new InjectionToken<ExtendzKeycloakSignUpModule>(
  'extKeycloakSignUp.config'
);

@NgModule({
  imports: [
    CommonModule,
    ExtendPipesModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    //Material
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [KeycloakSignUpComponent],
  exports: [KeycloakSignUpComponent],
  providers: [KeycloakSignUpService]
})
export class ExtendzKeycloakSignUpModule {
  public static forRoot(config: KeycloakSignUpConfig): ModuleWithProviders {
    return {
      ngModule: ExtendzKeycloakSignUpModule,
      providers: [
        {
          provide: EXT_KEYCLOAK_SINGUP_CONFIG,
          useValue: config
        },
        {
          provide: KeycloakSignUpConfig,
          useFactory: provideKeyCloakSignUpConfig,
          deps: [KeycloakConfig, EXT_KEYCLOAK_SINGUP_CONFIG]
        }
      ]
    };
  } // forRoot()
}

export function provideKeyCloakSignUpConfig(
  keycloakConfig: KeycloakConfig,
  keycloakSignupConfig: KeycloakSignUpConfig
): KeycloakSignUpConfig {
  return keycloakSignupConfig;
}
