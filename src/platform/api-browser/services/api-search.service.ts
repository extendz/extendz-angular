import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ExtRestConfig, RestService } from '../../common/';
import { Observable } from 'rxjs/Observable';
import { ObjectWithLinks, ModelMeta } from '../api-table/models';
import { ExtendzApiConfig } from '..';
@Injectable()
export class ApiSearchService {

  constructor(
    private conf: ExtRestConfig,
    private apiConfig: ExtendzApiConfig,
    private http: HttpClient,
    private rest: RestService
  ) {}
  
    search(model: string, searchText: string, selector: string): Observable<ObjectWithLinks> {
      let params: HttpParams = new HttpParams();
      params = params.append(selector, searchText);
      const httpOptions = {
        params
      };
      return this.rest.findAll(model, httpOptions);
    } //findAll()

    getModel(model: string): Observable<ModelMeta> {
      let url = this.conf.basePath + '/' + this.apiConfig.modelsEndpont + '/' + model.toLowerCase();
      console.log("getModel url:",url);
  
      return this.http.get<ModelMeta>(url);
    } // getModel()
}
