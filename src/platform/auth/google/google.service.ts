import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { take } from 'rxjs/operators/take';
import { of } from 'rxjs/observable/of';

import { GoogleConf } from './models/google.conf';
import { PrincipalService, TokenExchangeService } from '../common';
import { UserInfo, AccessToken } from '../common';

declare let gapi: any;
export const PROVIDER = 'google';

@Injectable()
export class GoogleService {
  gauth: any;
  @Output() token: EventEmitter<AccessToken>;
  @Output() userInfo: EventEmitter<UserInfo>;
  constructor(
    private config: GoogleConf,
    private principal: PrincipalService,
    private tokenExService: TokenExchangeService
  ) {}

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
    token: EventEmitter<AccessToken>,
    userInfo: EventEmitter<UserInfo>
  ): Observable<AccessToken> {
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
  } // login()

  private fetchGoogleUserDetails(observer) {
    let currentUser = this.gauth.currentUser.get();
    // Emit the token
    let act: AccessToken = {
      access_token: currentUser.getAuthResponse().access_token,
      token_type: 'bearer'
      //expires_in: currentUser.getAuthResponse()
    };
    this.token.emit(act);

    let profile = currentUser.getBasicProfile();

    // return {

    //   uid: profile.getId(),
    //   name: profile.getName(),
    //   email: profile.getEmail(),
    //   image: profile.getImageUrl(),
    //   provider: PROVIDER
    // };
  } // End _fetchGoogleUserDetails()
} // End class GoogleService
