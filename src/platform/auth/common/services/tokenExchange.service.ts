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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { TokenService } from './token.service';

@Injectable()
export class TokenExchangeService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  /**
   * Exchange the social login tokens with Oauth2 server. (Ex: Keycloack)
   *
   * @param url
   * @param token
   * @param issuer
   */
  exchangeToken(url: string, token: string, issuer: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let body = new URLSearchParams();
    body.set('client_id', 'ceylon-angular');
    body.set('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
    body.set('subject_token', token);
    body.set('subject_issuer', issuer);
    body.set('subject_token_type', 'urn:ietf:params:oauth:token-type:access_token');
    return this.http.post(url, body.toString(), httpOptions);
  } // exchangeToken()
  
}
