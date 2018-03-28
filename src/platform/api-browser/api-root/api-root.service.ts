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
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { of } from 'rxjs/observable/of';

import { ExtRestConfig, ObjectWithLinks, RestService } from '../../common';

import { ExtendzApiConfig, ModelMeta } from '../models';

import { Href } from '../../common/services/rest/models/href';

@Injectable()
export class ApiRootService {
  constructor(
    private apiConfig: ExtendzApiConfig,
    private restConfig: ExtRestConfig,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private rest: RestService
  ) {
    this.iconRegistry.addSvgIconSetInNamespace(
      'api-root',
      sanitizer.bypassSecurityTrustResourceUrl(this.apiConfig.svgIconSet)
    );
  } // constructor()

  public getRoot(): Observable<ModelMeta[]> {
    return this.rest.http.get<ModelMeta[]>(this.restConfig.basePath + '/models');
  }
} // class
