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
import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { take } from 'rxjs/operators/take';
import { of } from 'rxjs/observable/of';

import { GoogleConf } from './models/google.conf';
import { PrincipalService, TokenExchangeService, UserInfo, AccessToken } from '../common';

declare let gapi: any;
export const PROVIDER = 'google';
/**
 * Google auth Api handling service.
 * @author Randika Hapugoda
 * @see https://developers.google.com/identity/sign-in/web/reference#googleusergetid
 */
@Injectable()
export class GoogleService {
  gauth: any;
  @Output() tokenEmmiter: EventEmitter<AccessToken>;
  @Output() userInfoEmitter: EventEmitter<UserInfo>;
  constructor(
    private config: GoogleConf,
    private principal: PrincipalService,
    private tokenExService: TokenExchangeService
  ) {}

  /**
   * Initialize the scripts that is need to call Google services.
   */
  init(): Observable<Object> {
    return Observable.create((observer: Observer<Object>) => {
      let d = document,
        gJs,
        ref: any = d.getElementsByTagName('script')[0];
      gJs = d.createElement('script');
      gJs.async = true;
      gJs.src = '//apis.google.com/js/platform.js';

      let config = this.config;

      gJs.onload = function() {
        gapi.load('auth2', function() {
          gapi.auth2.init({
            client_id: config.client_id,
            scope: config.scope ? config.scope : 'profile'
          });
          observer.next({});
          observer.complete();
        });
      };
      ref.parentNode.insertBefore(gJs, ref);
    });
  } // init()

  login(
    tokenEmmiter: EventEmitter<AccessToken>,
    userInfoEmitter: EventEmitter<UserInfo>
  ): Observable<AccessToken> {
    this.tokenEmmiter = tokenEmmiter;
    this.userInfoEmitter = userInfoEmitter;
    return this.init().pipe(
      mergeMap(() => this.doLogin()),
      mergeMap((accssToken: AccessToken) => {
        if (this.config.exchangeServer && this.config.exchangeServer.url)
          return this.tokenExService
            .exchangeToken(this.config.exchangeServer.url, accssToken.access_token, PROVIDER)
            .pipe(take(1));
        else return of(accssToken);
      })
    );
  } // login()

  doLogin(): Observable<AccessToken> {
    return Observable.create((observer: Observer<AccessToken>) => {
      if (typeof this.gauth == 'undefined') {
        this.gauth = gapi.auth2.getAuthInstance();
      }
      if (!this.gauth.isSignedIn.get()) {
        this.gauth.signIn().then(() => {
          this.fetchGoogleUserDetails(observer);
        });
      } else {
        this.fetchGoogleUserDetails(observer);
      }
    });
  } // doLogin()

  private fetchGoogleUserDetails(observer : Observer<AccessToken>) {
    let currentUser = this.gauth.currentUser.get();
    // Emmit the token
    let accessToken: AccessToken = {
      access_token: currentUser.getAuthResponse().access_token,
      expires_in: currentUser.getAuthResponse.expires_in,
      token_type: currentUser.getAuthResponse.token_type
    };
    this.tokenEmmiter.emit(accessToken);

    let profile = currentUser.getBasicProfile();
    let userInfo: UserInfo = {
      name: profile.getName(),
      email: profile.getEmail(),
      picture: profile.getImageUrl(),
      given_name: profile.getGivenName(),
      family_name: profile.getFamilyName()
    };
    // Emmit userInfo
    this.userInfoEmitter.emit(userInfo);
    observer.complete();
    return userInfo;
  } // fetchGoogleUserDetails()
} // class
