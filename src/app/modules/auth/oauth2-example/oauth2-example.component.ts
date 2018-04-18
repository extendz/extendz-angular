import { Component, OnInit } from '@angular/core';
import { Oauth2Config, AccessToken, UserInfo } from '../../../../platform';

@Component({
  selector: 'app-oauth2-example',
  templateUrl: './oauth2-example.component.html',
  styleUrls: ['./oauth2-example.component.css']
})
export class Oauth2ExampleComponent {
  accessToken: AccessToken;
  userInfo: UserInfo;

  constructor() {}

  onToken(accessToken: AccessToken) {
    this.accessToken = accessToken;
  } // onToken()

  onUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }
} // class
