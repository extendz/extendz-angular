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
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { take } from 'rxjs/operators/take';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { of } from 'rxjs/observable/of';

import * as fb from 'fb';

import { FacebookConfig } from './models/facebook.conf';
import {
  TokenService,
  PrincipalService,
  TokenExchangeService,
  AccessToken,
  UserInfo
} from '../common';

declare let FB: any;
export const PROVIDER = 'facebook';
/**
 * Facebook auth Api handling service.
 * @author Randika Hapugoda
 */
@Injectable()
export class FacebookService {
  @Output() token: EventEmitter<AccessToken>;
  @Output() userInfo: EventEmitter<UserInfo>;
  constructor(
    private config: FacebookConfig,
    private tokenService: TokenService,
    private principal: PrincipalService,
    private http: HttpClient,
    private tokenExService: TokenExchangeService
  ) {}

  init(): Observable<Object> {
    return Observable.create((observer: Observer<Object>) => {
      let ref: any = document.getElementsByTagName('script')[0];
      let fbJs = document.createElement('script');
      fbJs.id = 'facebook-jssdk';
      fbJs.async = true;
      fbJs.src = '//connect.facebook.net/en_US/sdk.js';
      let config = this.config;
      fbJs.onload = () => {
        FB.init({
          appId: config.appId,
          status: true,
          cookie: true,
          xfbml: true,
          version: config.version ? config.version : 'v2.8'
        });
        observer.next({});
        observer.complete();
      };
      ref.parentNode.insertBefore(fbJs, ref);
    });
  } //init()

  login(
    token: EventEmitter<AccessToken>,
    userInfo: EventEmitter<UserInfo>
  ): Observable<AccessToken> {
    this.token = token;
    this.userInfo = userInfo;
    return this.init().pipe(
      mergeMap(() => this.doLogin()),
      mergeMap((accssToken: AccessToken) => {
        if (this.config.exchangeServer && this.config.exchangeServer.url)
          return this.tokenExService
            .exchangeToken(this.config.exchangeServer.url, accssToken.access_token, PROVIDER)
            .pipe(
              take(1),
              mergeMap(ac => {
                this.tokenService.setToken(ac);
                return of(ac);
              })
            );
        else return of(accssToken);
      })
    );
  } // login()

  // TODO improve over this code
  doLogin(): Observable<AccessToken> {
    return Observable.create((observer: Observer<AccessToken>) => {
      FB.getLoginStatus((response: any) => {
        // if the status is connected call
        if (response.status === 'connected') {
          this.handleResponse(response, observer);
        } else {
          FB.login(
            (res: any) => {
              this.handleResponse(res, observer);
            },
            { scope: 'email' }
          );
        }
      });
    });
  } // login

  handleResponse(response : fb.LoginStatusResponse , observer :Observer<AccessToken>) {
    if (response.authResponse) {
      // Emit the token
      let act: AccessToken = {
        access_token: response.authResponse.accessToken,
        token_type: 'bearer',
        expires_in: response.authResponse.expiresIn
      };
      this.token.emit(act);
      observer.next(act);
    }
    if (response.status === 'connected') {
      this.callUseInfoApi(observer);
    }
  }

  callUseInfoApi(observer :Observer<AccessToken>) {
    FB.api('/me?fields=name,email,picture', (res: any) => {
      if (!res || res.error) {
        observer.error(res.error);
      } else {
        let userInfo: UserInfo = {
          name: res.name,
          email: res.email,
          picture: res.picture.data.url
        };
        this.userInfo.emit(userInfo);
        observer.complete();
      }
    });
  } // callUseInfoApi()
} // class
