import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';

import { SingupExampleRoutingModule } from './singup-example-routing.module';
import { SingupExampleComponent } from './singup-example.component';
import {
  ExtendzKeycloakModule,
  ExtendzKeycloakSignUpModule,
  FeildTypes
} from '../../../../platform';

@NgModule({
  imports: [
    CommonModule,
    SingupExampleRoutingModule,
    MatTabsModule,
    ExtendzKeycloakModule.forRoot({
      //server: 'https://extendz-keycloak.herokuapp.com/auth',
      server: 'http://192.168.120.14:8080/auth',
      //realm: 'extendz',
      realm: 'rsmetrics',
      //client_id: 'angular',
      client_id: 'ceylon-angular',
      frontAdmin: {
        userName: 'frontadmin',
        password: 'admin'
      }
    }),
    ExtendzKeycloakSignUpModule.forRoot({
      fields: [
        {
          name: FeildTypes.Username,
          min: 1,
          required: true
        },
        {
          name: FeildTypes.Email,
          //required: true,
          min: 2,
          max: 18
        },
        {
          name: FeildTypes.firstName
        },
        {
          name: FeildTypes.lastName
        },
        {
          name: FeildTypes.Password
          //required: true,
          // min: 5
        }
      ]
    })
  ],
  declarations: [SingupExampleComponent]
})
export class SingupExampleModule {}
