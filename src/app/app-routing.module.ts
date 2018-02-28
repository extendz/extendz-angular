import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/index/index.module#IndexModule'
  },
  {
    path: 'login',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'map',
    loadChildren: './modules/google-map-example/mapexample/mapexample.module#MapexampleModule'
  },
  {
    path: 'apis',
    loadChildren: './modules/api/api-example.module#ApiExampleModule'
  },
  {
    path: 'openlayer',
    loadChildren: './modules/openlayer-example/openlayer-example.module#OpenlayerExampleModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
