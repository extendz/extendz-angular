import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpirngBootComponent } from './spirng-boot/spirng-boot.component';
import { DocumentationComponent } from './documentation.component';

const routes: Routes = [
  { path: '', component: DocumentationComponent },
  {
    path: 'springboot',
    component: SpirngBootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule {}
