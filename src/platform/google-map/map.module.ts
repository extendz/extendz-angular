import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

import { MapService } from './map.service';
import { MapComponent } from './map.component';
import { MapConfig } from './models';

// Material Component Imports
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';

export const EXT_MAP_CONFIG = new InjectionToken<MapModule>('extMap.config');

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule
  ],
  declarations: [MapComponent],
  exports: [MapComponent],
  providers: [MapService]
})
export class MapModule {
  public static forRoot(config: MapConfig): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: [
        {
          provide: EXT_MAP_CONFIG,
          useValue: config
        },
        {
          provide:MapConfig,
          useFactory: provideMapConfig,
          deps: [EXT_MAP_CONFIG]
        }
      ]
    };
  } // forRoot()
}

export function provideMapConfig(config: MapConfig): MapConfig {
  return config;
}
