import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiItemExampleComponent } from './api-item-example.component';

const routes: Routes = [
  {
    path: '',
    component: ApiItemExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiItemExampleRoutingModule {}
