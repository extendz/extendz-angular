/*
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
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar, MatIconRegistry } from '@angular/material';
import { TdLoadingService } from '@covalent/core/loading';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';
import { finalize } from 'rxjs/operators/finalize';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { filter } from 'rxjs/operators/filter';

import { Oauth2Service } from './oauth2.service';
import { AccessToken, TokenService, PrincipalService, UserInfo } from '../common';
import { Oauth2Config } from './models/oauth2.conf';

@Component({
  selector: 'ext-login-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.css']
})
export class Oauth2Component implements OnInit, OnDestroy {
  overlayStarSyntax: boolean = false;
  signInForm: FormGroup;

  // form controllers
  emailFormControl: FormControl;
  passwordFormControl: FormControl;

  serviceSubscripion$: Subscription;

  /** Emmit on successful token receive. */
  @Output() token: EventEmitter<AccessToken> = new EventEmitter<AccessToken>();

  /** Emmit on successful user infomation receive.*/
  @Output() userInfo: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();

  constructor(
    private service: Oauth2Service,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
    private principalService: PrincipalService,
    private loadingService: TdLoadingService
  ) {
    this.createForm();
  } // constructor()

  ngOnInit() {
    let sub = this.principalService
      .getUser()
      .pipe(
        filter(user => user != null),
        tap(user => {
          this.token.emit(this.tokenService.getToken());
          this.userInfo.emit(user);
        })
      )
      .subscribe(user => {
        if (sub) sub.unsubscribe();
      });
  } // ngOnInit()

  createForm() {
    this.emailFormControl = new FormControl('', [
      Validators.required
      //  Validators.pattern(EMAIL_REGEX)
    ]);

    this.passwordFormControl = new FormControl('', [Validators.required]);

    this.signInForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  } // createForm()

  login() {
    this.loadingService.register('overlayStarSyntax');
    this.serviceSubscripion$ = this.service
      .login(this.signInForm.value)
      .pipe(
        finalize(() => this.loadingService.resolve('overlayStarSyntax')),
        take(1),
        tap((accessToken: AccessToken) => this.tokenService.setToken(accessToken)),
        mergeMap((accessToken: AccessToken) => {
          this.token.emit(accessToken);
          return this.service.getUserInfo(accessToken);
        }),
        tap((userInfo: UserInfo) => {
          this.userInfo.emit(userInfo);
          this.principalService.setUser(userInfo);
        })
      )
      .subscribe(
        response => {},
        errorResponse => {
          this.snackBar.open(errorResponse.error.error_description, null, {
            duration: 3000
          });
        }
      );
  } // login()

  ngOnDestroy(): void {
    if (this.serviceSubscripion$) this.serviceSubscripion$.unsubscribe();
  } // ngOnDestroy()
} // claass
