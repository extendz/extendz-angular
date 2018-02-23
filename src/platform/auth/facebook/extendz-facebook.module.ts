import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { CovalentLoadingModule } from '@covalent/core/loading';

import { FacebookComponent } from './facebook.component';
import { FacebookConfig } from './models/facebook.conf';
import { FacebookService } from './facebook.service';
import { ExtendzAuthCommonModule } from '../common';

export const EXT_FACEBOOK_CONFIG = new InjectionToken<ExtendzFacebookModule>('extFacebook.config');

@NgModule({
  imports: [MatIconModule, MatButtonModule, CovalentLoadingModule, ExtendzAuthCommonModule],
  declarations: [FacebookComponent],
  exports: [FacebookComponent],
  providers: [FacebookService]
})
export class ExtendzFacebookModule {
  public static forRoot(config: FacebookConfig): ModuleWithProviders {
    return {
      ngModule: ExtendzFacebookModule,
      providers: [
        {
          provide: EXT_FACEBOOK_CONFIG,
          useValue: config
        },
        {
          provide: FacebookConfig,
          useFactory: provideFacebookConfig,
          deps: [EXT_FACEBOOK_CONFIG]
        }
      ]
    };
  } // forRoot()
}

export function provideFacebookConfig(config: FacebookConfig): FacebookConfig {
  return config;
}
