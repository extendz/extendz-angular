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
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LocalStorageService } from 'ngx-webstorage';

import { AccessToken } from '../models/accessToken';

@Injectable()
export class TokenService {
  private TOKEN_KEY: string = 'TOKEN';

  constructor(private storage: LocalStorageService) {}

  getToken(): AccessToken {
    return this.storage.retrieve(this.TOKEN_KEY);
  } //  getToken()

  setToken(accessResponse: AccessToken): AccessToken {
    this.storage.store(this.TOKEN_KEY, accessResponse);
    return accessResponse;
  } //  setToken()

  hasValidToken(): boolean {
    let token = this.getToken();
    if (token && token.expires_in && token.expires_in > new Date().getTime()) {
      return true;
    }
    return false;
  } //  hasValidToken()

  saveToken(accessToken: AccessToken): AccessToken {
    // Add the current time to calculate the time
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + accessToken.expires_in);
    accessToken.expires_in = expiredAt.getTime();
    this.setToken(accessToken);
    return accessToken;
  } //  saveToken()

  remove(): void {
    this.storage.clear(this.TOKEN_KEY);
  } //  remove()
} // End class TokenService
