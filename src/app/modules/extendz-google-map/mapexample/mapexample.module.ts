import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapexampleComponent } from './mapexample.component';
import { ExtendzGoogleMapModule } from '../../../../platform/extendz-google-map';
import { MapExampleRoutingModule } from './mapexample.routing';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    ExtendzGoogleMapModule.forRoot({
      apiKey:"AIzaSyCGqeyOzgZyvKq0kwn35H4DSCudBsdRBAA"
    }),
    MapExampleRoutingModule
  ],
  declarations: [MapexampleComponent]
})
export class MapexampleModule { }
