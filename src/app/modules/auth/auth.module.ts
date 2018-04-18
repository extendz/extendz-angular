import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { CovalentHighlightModule } from '@covalent/highlight';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { Oauth2ExampleComponent } from './oauth2-example/oauth2-example.component';

import { FacebookExampleComponent } from './facebook-example/facebook-example.component';
import { GoogleExampleComponent } from './google-example/google-example.component';
import { ExtendzOauth2Module, ExtendzFacebookModule } from '../../../platform';
import { ExtendzGoogleModule } from '../../../platform/auth/google';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ExtendzOauth2Module.forRoot({
      tokenUrl:
        'https://extendz-keycloak.herokuapp.com/auth/realms/extendz/protocol/openid-connect/token',
      userInfoUrl:
        'https://extendz-keycloak.herokuapp.com/auth/realms/extendz/protocol/openid-connect/userinfo',
      clinetId: 'angular',
      grantType: 'password'
    }),
    ExtendzFacebookModule.forRoot({
      appId: '341194909711465',
      exchangeServer: {
        url:
          'https://extendz-keycloak.herokuapp.com/auth/realms/extendz/protocol/openid-connect/token',
        client_id: 'angular'
      }
    }),
    ExtendzGoogleModule.forRoot({
      client_id: '476518848997-iivshtcbmvqur358fc566muejigf978s.apps.googleusercontent.com',
      exchangeServer: {
        url:
          'https://extendz-keycloak.herokuapp.com/auth/realms/extendz/protocol/openid-connect/token',
        client_id: 'angular'
      }
    }),
    FlexLayoutModule,
    CovalentHighlightModule,
    // Mat
    MatTabsModule,
    MatCardModule
  ],
  declarations: [
    AuthComponent,
    GoogleExampleComponent,
    Oauth2ExampleComponent,
    FacebookExampleComponent
  ]
})
export class AuthModule {}
