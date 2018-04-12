import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';

import { SingupExampleRoutingModule } from './singup-example-routing.module';
import { SingupExampleComponent } from './singup-example.component';
import { ExtendzSignUpModule, FieldType, EMAIL_REGEX } from '../../../../platform/auth/sing-up';

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
          name: 'userName',
          type: FieldType.Text,
          required: true
        },
        {
          title: 'Password',
          name: 'password',
          type: FieldType.Password,
          required: true
        },
        {
          title: 'Email',
          name: 'email',
          type: FieldType.Email,
          pattern: {
            pattern: EMAIL_REGEX,
            errorMessage: 'Email not valid'
          }
        }
      ]
    })
  ],
  declarations: [SingupExampleComponent]
})
export class SingupExampleModule {}
