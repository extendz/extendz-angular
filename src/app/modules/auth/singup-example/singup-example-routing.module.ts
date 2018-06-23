import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingupExampleComponent } from './singup-example.component';

const routes: Routes = [{ path: '', component: SingupExampleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingupExampleRoutingModule {}
