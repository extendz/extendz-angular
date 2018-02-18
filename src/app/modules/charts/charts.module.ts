import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import {ChartsRoutingModule} from './charts-routing.module';
import {HighchartExampleComponent} from './highchart-example/highchart-example.component';
import {HighchartModule} from '../../../platform/charts/highchart';

@NgModule({
  imports: [
    CommonModule,
    ChartsRoutingModule,
    HighchartModule
  ],
  declarations: [ChartsComponent, HighchartExampleComponent]
})
export class ChartsModule { }
