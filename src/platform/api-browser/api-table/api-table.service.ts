import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import {
  RestService,
  ExtRestConfig,
  HateosPagedResponse,
  ObjectWithLinks,
  ModelMeta,
  ModelMetaService
} from '../../common';

import { PageAndSort } from '../models';

@Injectable()
export class ApiTableService {
  constructor(
    private conf: ExtRestConfig,
    private modelMetaService: ModelMetaService,
    public rest: RestService
  ) {}

  getModel(model: string, projecion?: string): Observable<ModelMeta> {
    return this.modelMetaService.getModel(model, projecion);
  } // getModel()

  getTableData(meta: ModelMeta, pageAndSort?: PageAndSort): Observable<HateosPagedResponse> {
    let params: HttpParams = new HttpParams();
    params = params.append('projection', 'dataTable');
    if (pageAndSort) {
      params = params.append('page', pageAndSort.page.toString());
    }
    return this.rest.http.get<HateosPagedResponse>(this.conf.basePath + meta.url, { params });
  } // getTableData()

  getItem(url: any): Observable<ObjectWithLinks> {
    return this.rest.http.get<ObjectWithLinks>(url);
  }
} // class
