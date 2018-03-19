import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'reader',
    loadChildren: './qr-reader-example/qr-reader-example.module#QrReaderExampleModule'
  },
  {
    path: 'generator',
    loadChildren: './qr-generator-example/qr-generator-example.module#QrGeneratorExampleModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QRExampleRoutingModule {}
