/**
 * Copyright 2012-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Credential } from './models/crerential';
import { Oauth2Config } from './models/oauth2.conf';
import { AccessToken } from '../common/';

/**
 * Oauth2 Service.
 * @author Randika Hapugoda
 */
@Injectable()
export class Oauth2Service {
  constructor(private http: HttpClient, private config: Oauth2Config) {} // constructor()

  login(credentail: Credential): Observable<AccessToken> {
    let body = new URLSearchParams();
    body.set('username', credentail.email);
    body.set('password', credentail.password);
    body.set('grant_type', this.config.grantType);
    body.set('scope', this.config.scope);
    body.set('client_secret', this.config.clientSecret);
    body.set('client_id', this.config.clinetId);

    return this.http.post<AccessToken>(this.config.tokenUrl, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
    });
  } // login()

  /**this is not working : https://issues.jboss.org/browse/KEYCLOAK-2939?page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel&showAll=true */
  logout(accessToken: AccessToken) {
    let body = new URLSearchParams();
    body.set('client_id', this.config.clinetId);
    body.set('refresh_token', accessToken.refresh_token);
    return this.http.post(this.config.logoutUrl, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  } // logout()

  getUserInfo(accessToken: AccessToken) {
    return this.http.get(this.config.userInfoUrl);
  } // getUserInfo()
} // class
