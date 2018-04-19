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
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LocalStorageService } from 'ngx-webstorage';

import { UserInfo } from '../models/';
import { AuthConfig } from '../config/auth-common.config';
import { ExtRestConfig, RestService } from '../../../common';

/**
 * Handle security principal services.
 * @author Randika Hapugoda
 */
@Injectable()
export class PrincipalService {
  /** Unique key for the storage to use.*/
  private USER_KEY: string = 'USER';

  /** User Subscription*/
  private user$: Observable<UserInfo>;

  constructor(
    private authConfig: AuthConfig,
    private rest: RestService,
    private storage: LocalStorageService
  ) {}

  /** Get cached user form the local storage */
  private getFromStoreage(): UserInfo {
    return this.storage.retrieve(this.USER_KEY);
  } // getFromStoreage()

  public getUser(): Observable<UserInfo> {
    return of(this.getFromStoreage());
  } // getUser()

  public setUser(user: UserInfo): void {
    this.storage.store(this.USER_KEY, user);
  } // setUser()

  public getUserProfile() {
    return this.rest.get(this.authConfig.profileUrl);
  } // getUserProfile(()

  public remove(): void {
    this.storage.clear(this.USER_KEY);
  } //  clear()
} // class
