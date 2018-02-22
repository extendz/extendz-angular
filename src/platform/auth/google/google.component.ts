import { Component, NgZone, Output, EventEmitter } from '@angular/core';
import { TdLoadingService } from '@covalent/core/loading';

import { take } from 'rxjs/operators/take';
import { finalize } from 'rxjs/operators/finalize';

import { GoogleService } from './google.service';
import { AccessToken, UserInfo } from '../common';

@Component({
  selector: 'ext-login-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent {
  /**
   * Emmit on successful token receive.
   */
  @Output() token: EventEmitter<AccessToken> = new EventEmitter<AccessToken>();

  /**
   * Emmit on successful user infomation receive.
   */
  @Output() userInfo: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();
  constructor(
    private service: GoogleService,
    private zone: NgZone,
    private loadingService: TdLoadingService
  ) {}

  login() {
    this.loadingService.register('gl');
    this.service
      .login(this.token, this.userInfo)
      .pipe(finalize(() => this.zone.run(() => this.loadingService.resolve('gl'))), take(1))
      .subscribe(d => console.log(d));
  } // login()
} // class
