import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ObservableMedia } from '@angular/flex-layout';

import { Observable } from 'rxjs/Observable';

import { RestService, ExtRestConfig, HateosPagedResponse, ObjectWithLinks } from '../../common';
import { ExtendzApiConfig, ModelMeta, PageAndSort } from '../models';

@Injectable()
export class ApiTableService {
  constructor(
    private conf: ExtRestConfig,
    private media: ObservableMedia,
    private apiConfig: ExtendzApiConfig,
    public rest: RestService
  ) {}

  getModel(model: string, projecion?: string): Observable<ModelMeta> {
    let params: HttpParams = new HttpParams();
    if (projecion) {
      params = params.append('projection', projecion);
    }

    let url = this.conf.basePath + '/' + this.apiConfig.modelsEndpont + '/' + model.toLowerCase();
    return this.rest.http.get<ModelMeta>(url, { params });
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
