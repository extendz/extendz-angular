import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'root',
    loadChildren: './api-root-example/api-root-example.module#ApiRootExampleModule'
  }
  // {
  //   path: 'selector',
  //   loadChildren: './api-selector-example/api-selector-example.module#ApiSelectorExampleModule'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiExampleRoutingModule {}
