import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../platform';
import { Observable } from 'rxjs/Observable';
import { ObjectWithLinks } from '../../../../platform/common/services/rest/models/objectWithLinks';

export class Product extends ObjectWithLinks {
  name?: string;
}

@Component({
  selector: 'app-api-image-example',
  templateUrl: './api-image-example.component.html',
  styleUrls: ['./api-image-example.component.css']
})
export class ApiImageExampleComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(private rest: RestService) {
    this.products$ = this.rest.findAll('products');
  }

  ngOnInit() {}
}
