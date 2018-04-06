import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';

import { SingupExampleRoutingModule } from './singup-example-routing.module';
import { SingupExampleComponent } from './singup-example.component';
import { ExtendzKeycloakModule, ExtendzKeycloakSignUpModule } from '../../../../platform';
import { ExtendzSignUpModule } from '../../../../platform/auth/sing-up';
import { FieldType } from '../../../../platform/auth/sing-up/models/singUp.config';

@NgModule({
  imports: [
    CommonModule,
    SingupExampleRoutingModule,
    MatTabsModule,
    ExtendzSignUpModule.forRoot({
      url: 'user/sign-up',
      fields: [
        {
          title: 'User Name',
          type: FieldType.Text
        },
        {
          title: 'Password',
          type: FieldType.Password
        },
        {
          title: 'Email',
          type: FieldType.Email
        }
      ]
    })
  ],
  declarations: [SingupExampleComponent]
})
export class SingupExampleModule {}
