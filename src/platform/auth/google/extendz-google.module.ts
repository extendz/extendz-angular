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
