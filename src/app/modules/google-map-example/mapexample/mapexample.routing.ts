import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapexampleComponent } from './mapexample.component';

const routes: Routes = [
  {
    path: '',
    component: MapexampleComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapExampleRoutingModule {}
