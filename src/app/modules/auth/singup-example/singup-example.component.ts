import { Component, OnInit } from '@angular/core';
import { ObjectWithLinks } from '../../../../platform';
import { UserSingUpDto } from './models/userSignUpDto';
import { ExtendzFormGroup } from '../../../../../deploy/platform/auth/sing-up/formGroup';

@Component({
  selector: 'app-singup-example',
  templateUrl: './singup-example.component.html',
  styleUrls: ['./singup-example.component.css']
})
export class SingupExampleComponent implements OnInit {
  formz: ExtendzFormGroup;
  constructor() {}

  ngOnInit() {}

  onSuccess(user: ObjectWithLinks) {
    console.log(user);
  }
}
