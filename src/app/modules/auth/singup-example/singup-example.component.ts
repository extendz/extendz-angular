import { Component, OnInit } from '@angular/core';
import { UserRepresentationBase } from '../../../../platform';

@Component({
  selector: 'app-singup-example',
  templateUrl: './singup-example.component.html',
  styleUrls: ['./singup-example.component.css']
})
export class SingupExampleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onSuccess(user: UserRepresentationBase) {
    console.log(user);
  }
}
