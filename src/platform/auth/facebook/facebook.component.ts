import { Component, NgZone, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TdLoadingService } from '@covalent/core/loading';

import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators/take';
import { finalize } from 'rxjs/operators/finalize';

import { FacebookService } from './facebook.service';
import { AccessToken, UserInfo } from '../common/models';

@Component({
  selector: 'ext-login-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnDestroy {
  login$: Subscription;

  /**
   * Emmit on successful token receive.
   */
  @Output() token: EventEmitter<AccessToken> = new EventEmitter<AccessToken>();

  /**
   * Emmit on successful user infomation receive.
   */
  @Output() userInfo: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();

  constructor(
    private facebookService: FacebookService,
    private zone: NgZone,
    private loadingService: TdLoadingService
  ) {}

  login() {
    this.loadingService.register('fbLoading');
    this.login$ = this.facebookService
      .login(this.token, this.userInfo)
      .pipe(finalize(() => this.zone.run(() => this.loadingService.resolve('fbLoading'))))
      .subscribe();
  } // login()

  ngOnDestroy(): void {
    if (this.login$) this.login$.unsubscribe();
  }
} // class
