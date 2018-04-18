import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PrincipalService, UserInfo, TokenService } from '../../common';
import { Oauth2Service } from '../../oauth2/oauth2.service';

@Component({
  selector: 'ext-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['profile-button.component.scss']
})
export class ExtendzProfileButtonComponent {
  /** User Infomation */
  public user$: Observable<UserInfo>;

  constructor(
    private principal: PrincipalService,
    private oauth2Service: Oauth2Service,
    private token: TokenService
  ) {}

  ngOnInit() {
    this.user$ = this.principal.getUser();
  } // ngOnInit()

  logout() {
    this.oauth2Service.logout(this.token.getToken()).subscribe(d => console.log(d));
    //this.token.remove();
    //  this.principal.clear();
  } // logout
}
