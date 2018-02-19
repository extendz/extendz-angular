import { Component, OnInit } from '@angular/core';
import { Oauth2Config, AccessToken, UserInfo } from '../../../../platform';

@Component({
  selector: 'app-oauth2-example',
  templateUrl: './oauth2-example.component.html',
  styleUrls: ['./oauth2-example.component.css']
})
export class Oauth2ExampleComponent implements OnInit {
  accessToken: AccessToken;
  userInfo: UserInfo;

  constructor() {}

  config: Oauth2Config = {
    tokenUrl:
      'https://extendz-keycloak.herokuapp.com/auth/realms/extendz/protocol/openid-connect/token',
    userInfoUrl:
      'https://extendz-keycloak.herokuapp.com/auth/realms/extendz/protocol/openid-connect/userinfo',
    clinetId: 'angular',
    grantType: 'password'
  };

  ngOnInit() {}

  onToken(accessToken: AccessToken) {
    this.accessToken = accessToken;
  } // onToken()

  onUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }
} // class
