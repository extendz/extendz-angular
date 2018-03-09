import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiRootExampleComponent } from './api-root-example.component';

const routes: Routes = [
  {
    path: '',
    component: ApiRootExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRootExampleRoutingModule {}
