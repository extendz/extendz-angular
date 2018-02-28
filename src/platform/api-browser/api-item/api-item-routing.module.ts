import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiItemComponent } from './api-item.component';

const routes: Routes = [
  {
    path: '',
    component: ApiItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiItemRoutingModule {}
