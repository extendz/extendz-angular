import { Component, OnInit } from '@angular/core';
import { AccessToken, UserInfo } from '../../../../platform';

@Component({
  selector: 'app-google-example',
  templateUrl: './google-example.component.html',
  styleUrls: ['./google-example.component.css']
})
export class GoogleExampleComponent implements OnInit {
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
