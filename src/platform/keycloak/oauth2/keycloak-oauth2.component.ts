import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeycloakOauth2Service } from './keyclock-ouath2.service';
import { Oauth2Config } from '../../auth/oauth2';
import { AccessToken } from '../../auth/common';

@Component({
  selector: 'ext-keycloak-oauth2',
  templateUrl: './keycloak-oauth2.component.html',
  styleUrls: ['./keycloak-oauth2.component.css']
})
export class KeycloakOauth2Component implements OnInit {
  config: Oauth2Config;
  @Output() success: EventEmitter<AccessToken> = new EventEmitter<AccessToken>();

  constructor(private service: KeycloakOauth2Service) {
    this.config = service.oauth2Config;
  }

  ngOnInit(): void {}

  onSuccess(accessToken: AccessToken): void {
    this.success.emit(accessToken);
  }
}
