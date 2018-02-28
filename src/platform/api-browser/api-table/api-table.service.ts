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

  getModel(model: string): Observable<ModelMeta> {
    let url = this.conf.basePath + '/' + this.apiConfig.modelsEndpont + '/' + model.toLowerCase();
    console.log(url);

    return this.http.get<ModelMeta>(url);
  } // getModel()

  getTableData(meta: ModelMeta, pageAndSort?: PageAndSort): Observable<TableResponse> {
    let params: HttpParams = new HttpParams();
    if (pageAndSort) {
      params = params.append('page', pageAndSort.page.toString());
    }
    return this.http.get<TableResponse>(meta.url, { params });
  } // getTableData()

  getItemId(url: string) {
    return this.rest.getId(url);
  } // getItemId
} // class
