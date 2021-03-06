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
import { Component, NgZone, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TdLoadingService } from '@covalent/core/loading';

import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators/take';
import { finalize } from 'rxjs/operators/finalize';

import { GoogleService } from './google.service';
import { AccessToken, UserInfo } from '../common';

@Component({
  selector: 'ext-login-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnDestroy {
  /**
   * Emmit on successful token receive.
   */
  @Output() token: EventEmitter<AccessToken> = new EventEmitter<AccessToken>();
  /**
   * Emmit on successful user infomation receive.
   */
  @Output() userInfo: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();
  /**
   * All the subscriptions
   */
  all$: Subscription;
  constructor(
    private googleService: GoogleService,
    private zone: NgZone,
    private loadingService: TdLoadingService
  ) {}

  login() {
    this.loadingService.register('gl');
    this.all$ = this.googleService
      .login(this.token, this.userInfo)
      .pipe(finalize(() => this.zone.run(() => this.loadingService.resolve('gl'))), take(1))
      .subscribe();
  } // login()

  ngOnDestroy(): void {
    if (this.all$) this.all$.unsubscribe();
  }
} // class
