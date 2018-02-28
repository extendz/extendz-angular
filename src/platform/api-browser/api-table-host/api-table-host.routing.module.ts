import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiTableHostComponent } from './api-table-host.component';

const routes: Routes = [
  {
    path: '',
    component: ApiTableHostComponent
  },
  {
    path: ':id',
    loadChildren: '../api-item/api-item.module#ApiItemModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiTableHostRoutingModule {}
