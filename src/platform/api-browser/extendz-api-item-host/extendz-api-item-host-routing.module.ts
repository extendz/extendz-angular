import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtendzApiItemHostComponent } from './extendz-api-item-host.component';

const routes: Routes = [
  {
    path: '',
    component: ExtendzApiItemHostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtendzApiItemHostRoutingModule {}
