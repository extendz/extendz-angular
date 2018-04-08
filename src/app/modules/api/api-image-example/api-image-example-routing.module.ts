import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiImageExampleComponent } from './api-image-example.component';

const routes: Routes = [
  {
    path: '',
    component: ApiImageExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiImageExampleRoutingModule {}
