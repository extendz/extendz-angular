import { Component, OnInit } from '@angular/core';
import { PrincipalService, UserInfo } from '../../common';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ext-profile-basic',
  templateUrl: './extendz-profile-basic.component.html',
  styleUrls: ['./extendz-profile-basic.component.scss']
})
export class ExtendzProfileBasicComponent implements OnInit {
  /** User Infomation */
  public user$: Observable<UserInfo>;

  constructor(private principal: PrincipalService) {}

  ngOnInit() {
    this.user$ = this.principal.getUser();
  } // ngOnInit()
}
