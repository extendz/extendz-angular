import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeycloakOauth2Component } from './keycloak-oauth2.component';
import { KeycloakOauth2Service } from './keyclock-ouath2.service';

import { ExtendzOauth2Module } from '../../auth';

@NgModule({
  imports: [CommonModule, ExtendzOauth2Module],
  declarations: [KeycloakOauth2Component],
  exports: [KeycloakOauth2Component],
  providers: [KeycloakOauth2Service]
})
export class KeycloakOauth2Module {}
