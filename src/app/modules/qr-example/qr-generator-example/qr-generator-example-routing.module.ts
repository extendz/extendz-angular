import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { QrgeneratorexampleComponent } from './qrgeneratorexample.component';

const routes: Routes = [
  {
    path: '',
    component: QrgeneratorexampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrGeneratorExampleRoutingModule {}
