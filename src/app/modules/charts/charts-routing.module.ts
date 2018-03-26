import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HighchartExampleComponent} from './highchart-example/highchart-example.component';

const routes: Routes = [
  {
    path: '',
    component: HighchartExampleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
