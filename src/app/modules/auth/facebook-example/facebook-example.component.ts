import { Component, OnInit } from '@angular/core';
import { AccessToken, UserInfo } from '../../../../platform';

@Component({
  selector: 'app-facebook-example',
  templateUrl: './facebook-example.component.html',
  styleUrls: ['./facebook-example.component.css']
})
export class FacebookExampleComponent implements OnInit {
  accessToken: AccessToken;
  userInfo: UserInfo;
  constructor() {}

  ngOnInit() {}

  onToken(accessToken: AccessToken) {
    this.accessToken = accessToken;
  } // onToken()

  onUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }
}
