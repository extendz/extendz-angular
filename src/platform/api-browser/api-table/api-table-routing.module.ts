import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiTableComponent } from './api-table.component';

const routes: Routes = [
  {
    path: '',
    component: ApiTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiTableRoutingModule {}
