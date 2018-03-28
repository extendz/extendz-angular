import { NgModule } from '@angular/core';
import { ApiTableExampleComponent } from './api-table-example.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ApiTableExampleComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiTableExampleRoutingModule {}
