import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HighchartExampleComponent} from './highchart-example/highchart-example.component';
import {ChartsComponent} from './charts.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    children: [{ path: 'highchart', component: HighchartExampleComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
