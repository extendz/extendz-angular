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
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { ApiRootService } from './api-root.service';
import { ModelMeta } from '../models';

@Component({
  selector: 'ext-api-root',
  templateUrl: './api-root.component.html',
  styleUrls: ['./api-root.component.scss']
})
export class ApiRootComponent implements OnInit {
  models$: Observable<ModelMeta[]>;

  @Output() select: EventEmitter<ModelMeta> = new EventEmitter<ModelMeta>();

  constructor(private apiRootService: ApiRootService) {}

  ngOnInit(): void {
    this.models$ = this.apiRootService.getRoot();
  } // ngOnInit()

  /**
   * On Select a model
   * @param model selected Model
   */
  onSelect(model: ModelMeta) {
    this.select.emit(model);
  }
} // class
