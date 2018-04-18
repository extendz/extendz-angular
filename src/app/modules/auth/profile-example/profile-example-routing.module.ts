import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileExampleComponent } from './profile-example.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileExampleRoutingModule {}
