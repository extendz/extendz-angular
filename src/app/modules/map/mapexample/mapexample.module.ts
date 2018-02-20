import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapexampleComponent } from './mapexample.component';
import { MapModule } from '../../../../platform/google-map';
import { MapExampleRoutingModule } from './mapexample.routing';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MapModule.forRoot({
      apiKey:"AIzaSyCGqeyOzgZyvKq0kwn35H4DSCudBsdRBAA",
      center:{
        lat:45.20,
        lng:20.17
      },
      zoom:4
    }),
    MapExampleRoutingModule
  ],
  declarations: [MapexampleComponent]
})
export class MapexampleModule { }
