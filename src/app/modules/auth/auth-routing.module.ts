import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { Oauth2ExampleComponent } from './oauth2-example/oauth2-example.component';
import { FacebookExampleComponent } from './facebook-example/facebook-example.component';
import { GoogleExampleComponent } from './google-example/google-example.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'oauth2', component: Oauth2ExampleComponent },
      { path: 'facebook', component: FacebookExampleComponent },
      { path: 'google', component: GoogleExampleComponent },
      {
        path: 'sign-up',
        loadChildren: './singup-example/singup-example.module#SingupExampleModule'
      },
      {
        path: 'profile',
        loadChildren: './profile-example/profile-example.module#ProfileExampleModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
