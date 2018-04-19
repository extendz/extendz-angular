/**
 *    Copyright 2018 the original author or authors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { ServiceWorkerModule } from '@angular/service-worker';
import {
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatExpansionModule,
  MatTooltipModule
} from '@angular/material';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import {
  ExtendzOauth2Module,
  ExtendzAuthCommonModule,
  TokenInterceptor,
  ExtendzApiModule
} from '../platform';
import { AppRoutingModule } from './app-routing.module';
import { ExtendzRestModule } from '../platform/common/services';
import { EXT_AUTH_CONFIG } from '../platform/auth/common';
import { AuthConfig } from '../platform/auth/common/config/auth-common.config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', {
    //   enabled: environment.production
    // }),
    // Extendz
    ExtendzAuthCommonModule.forRoot({
      profileUrl: '/user/profile'
    }),
    ExtendzRestModule.forRoot({
      basePath: environment.basePath
    }),
    // Mat
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
