import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatExpansionModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ExtendOauth2Module, ExtendAuthCommonModule, TokenInterceptor } from '../platform';
import { AppRoutingModule } from './app-routing.module';
import { ExtendRestModule } from '../platform/common/index';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    ExtendAuthCommonModule,
    ExtendRestModule.forRoot({
      basePath: '/api'
    }),
    // Mat
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
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
