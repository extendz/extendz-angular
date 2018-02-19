import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { CovalentHighlightModule } from '@covalent/highlight';


import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { Oauth2ExampleComponent } from './oauth2-example/oauth2-example.component';

import { ExtendOauth2Module } from '../../../platform';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ExtendOauth2Module,
    FlexLayoutModule,
    CovalentHighlightModule,
    // Mat
    MatTabsModule,
    MatCardModule
  ],
  declarations: [AuthComponent, Oauth2ExampleComponent]
})
export class AuthModule {}
