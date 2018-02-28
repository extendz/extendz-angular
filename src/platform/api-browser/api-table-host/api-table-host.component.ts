/**
 *    Copyright 2018 the original author or authors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectWithLinks } from '../api-table/models';

@Component({
  selector: 'app-api-table-host',
  templateUrl: './api-table-host.component.html',
  styleUrls: ['./api-table-host.component.css']
})
export class ApiTableHostComponent implements OnInit {
  model: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      console.log('param', param.name);
      this.model = param.name;
    });
  } // ngOnInit()

  onSelect(item: ObjectWithLinks) {
    console.log(ApiTableHostComponent.name, 'selected item', item);
    this.router.navigate([this.router.url, '0']);
  } //onSelect
} // class
