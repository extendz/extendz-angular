import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-api-root-example',
  templateUrl: './api-root-example.component.html',
  styleUrls: ['./api-root-example.component.css']
})
export class ApiRootExampleComponent implements OnInit {
  models$;

  constructor() {}

  ngOnInit() {
    this.models$ = of([
      {
        name: 'User'
      },
      {
        name: 'Role'
      }
    ]);
  }
}
