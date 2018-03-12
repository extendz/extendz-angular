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

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { TableResponse, PageAndSort, ModelMeta } from './models/';

import { RestService, ExtRestConfig } from '../../common';
import { ExtendzApiConfig } from '..';

@Injectable()
export class ApiTableService {
  constructor(
    private conf: ExtRestConfig,
    private apiConfig: ExtendzApiConfig,
    private http: HttpClient,
    private rest: RestService
  ) {}

  getTableData(meta: ModelMeta, pageAndSort?: PageAndSort): Observable<TableResponse> {
    let params: HttpParams = new HttpParams();
    if (pageAndSort) {
      params = params.append('page', pageAndSort.page.toString());
    }
    return this.http.get<TableResponse>(this.conf.basePath + meta.url, { params });
  } // getTableData()

  getItemId(url: string) {
    return this.rest.getId(url);
  } // getItemId
} // class
