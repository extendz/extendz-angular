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

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { RestService, ObjectWithLinks } from '../../common';

@Component({
  selector: 'ext-api-table-host',
  templateUrl: './api-table-host.component.html',
  styleUrls: ['./api-table-host.component.css']
})
export class ExtendzApiTableHostComponent implements OnInit, OnDestroy {
  /**
   * Selected model name
   */
  model: string;
  /**
   * Id for the selected item.0 for a new object
   */
  id: string;
  /***
   * All Subscriptions
   */
  all$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rest: RestService
  ) {}

  ngOnInit() {
    this.all$ = this.activatedRoute.params.subscribe(param => {
      this.model = param.name;
      this.id = param.id;
    });
  } // ngOnInit()

  ngOnDestroy(): void {
    if (this.all$) this.all$.unsubscribe();
  }

  onSelect(item: ObjectWithLinks) {
    let id = '0';
    if (item && item._links.self.href) {
      id = this.rest.getId(item._links.self.href);
    }
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  } //onSelect
} // class
