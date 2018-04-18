import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'root',
    loadChildren: './api-root-example/api-root-example.module#ApiRootExampleModule'
  },
  {
    path: 'root/:name',
    loadChildren: './api-table-example/api-table-example.module#ApiTableExampleModule'
  },
  {
    path: 'root/:name/:id',
    loadChildren: './api-item-example/api-item-example.module#ApiItemExampleModule'
  }
  ,{
    path:'image',loadChildren:'./api-image-example/api-image-example.module#ApiImageExampleModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiExampleRoutingModule {}
