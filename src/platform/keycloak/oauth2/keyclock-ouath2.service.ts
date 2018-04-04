import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Oauth2Config, Credential } from '../../auth/oauth2';
import { Oauth2Service } from '../../auth/oauth2/oauth2.service';
import { KeycloakConfig } from '../models';
import { AccessToken } from '../../auth/common';

@Injectable()
export class KeycloakOauth2Service {
  oauth2Config: Oauth2Config;

  constructor(
    private http: HttpClient,
    private ouath2Service: Oauth2Service,
    private config: KeycloakConfig
  ) {
    this.oauth2Config = {
      tokenUrl: `${this.config.server}/realms/${this.config.realm}/protocol/openid-connect/token`,
      userInfoUrl: `${this.config.server}/realms/${
        this.config.realm
      }/protocol/openid-connect/userinfo`,
      clinetId: 'ceylon-angular',
      grantType: 'password'
    };
  } // constutor()

  login(creential: Credential): Observable<AccessToken> {
    this.ouath2Service.init(this.oauth2Config);
    return this.ouath2Service.login(creential);
  } // login()
} // class
