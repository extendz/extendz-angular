import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { QrreaderexampleComponent } from './qrreaderexample.component';

const routes: Routes = [
  {
    path: '',
    component: QrreaderexampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrReaderExampleModuleRoutingModule {}
