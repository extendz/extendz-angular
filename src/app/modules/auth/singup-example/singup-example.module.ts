import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingupExampleRoutingModule } from './singup-example-routing.module';
import { SingupExampleComponent } from './singup-example.component';
import {
  ExtendzKeycloakModule,
  ExtendzKeycloakSignUpModule,
  FeildTypes
} from '../../../../platform';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SingupExampleRoutingModule,
    MatTabsModule,
    ExtendzKeycloakModule.forRoot({
      server: 'https://extendz-keycloak.herokuapp.com/auth',
      realm: 'extendz',
      client_id: 'angular',
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
          required: true,
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
          name: FeildTypes.Password,
          required: true,
          min: 5
        }
      ]
    })
  ],
  declarations: [SingupExampleComponent]
})
export class SingupExampleModule {}
