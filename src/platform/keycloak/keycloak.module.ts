import { NgModule, InjectionToken, ModuleWithProviders, Provider } from '@angular/core';
import { KeycloakConfig, IKeycloakConfig } from './models';

export const EXT_KEYCLOAK_CONFIG = new InjectionToken<ExtendzKeycloakModule>('extKeycloak.config');

export function keycloakFactory(config: IKeycloakConfig): KeycloakConfig {
  return new KeycloakConfig(config);
}

export const KEYCLOAK_PROVIDER: Provider = {
  provide: KeycloakConfig,
  useFactory: keycloakFactory,
  deps: [EXT_KEYCLOAK_CONFIG]
};
/**
 * Base for Keycloak
 * @author Randika Hapugoda
 */
@NgModule()
export class ExtendzKeycloakModule {
  public static forRoot(config: IKeycloakConfig): ModuleWithProviders {
    return {
      ngModule: ExtendzKeycloakModule,
      providers: [
        {
          provide: EXT_KEYCLOAK_CONFIG,
          useValue: config
        },
        KEYCLOAK_PROVIDER
      ]
    };
  } // forRoot()
} // class
