import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenlayerExampleComponent } from './openlayer-example.component';

const routes: Routes = [
  {
    path : "",
    component : OpenlayerExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenlayerExampleRoutingModule { }
