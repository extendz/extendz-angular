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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { KeycloakOauth2Service } from '../oauth2/keyclock-ouath2.service';
import { KeycloakSignUpConfig } from './models/keycloak-singup.config';
import { NewUser } from './models/newUser';

import { KeycloakConfig } from '../models';
import { AccessToken } from '../../auth/common';

@Injectable()
export class KeycloakSignUpService {
  constructor(
    private http: HttpClient,
    private singUpConfig: KeycloakSignUpConfig,
    private keycloakConfig: KeycloakConfig
  ) {}

  singup(): Observable<AccessToken> {
    let body = new URLSearchParams();
    body.set('username', this.keycloakConfig.frontAdmin.userName);
    body.set('password', this.keycloakConfig.frontAdmin.password);
    body.set('grant_type', 'password');
    body.set('client_id', this.keycloakConfig.client_id);

    return this.http.post<AccessToken>(
      this.keycloakConfig.server +
        '/realms/' +
        this.keycloakConfig.realm +
        '/protocol/openid-connect/token',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Accept', 'application/json')
      }
    );
  } //singup()

  createUser(user: NewUser, token: string) {
    let body = {
      username: user.username,
      enabled: 'true',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      credentials: [{ type: user.password, value: user.password }]
    };

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    return this.http.post(
      this.keycloakConfig.server + '/admin/realms/' + this.keycloakConfig.realm + '/users',
      body,
      {
        headers
      }
    );
  } //createUser()
}
