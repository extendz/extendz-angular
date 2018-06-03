/**
 * Copyright 2012-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { DeleteDialogComponent } from './dialog-delete/delete-dialog.componet';
import { ObjectWithLinks, HateosPagedResponse } from './models/';
import { ExtRestConfig } from '../../services/rest/models';

@Injectable()
export class RestService {
  constructor(public config: ExtRestConfig, public http: HttpClient, private dialog: MatDialog) {}

  /**
   * Clear invalied url from server.
   * Ex: http://localhost:8080/api/users{?page,size,sort}
   *
   * @param url invalid url
   */
  public clearUrl(url: string) {
    let paraStart = url.indexOf('{?');
    if (paraStart > 0) {
      url = url.substring(0, paraStart);
    }
    return url;
  } //  clearUrl()

  /**
   * Get Id from a url with tailing id
   * @param url
   */
  public getId(url: string) {
    return url.substring(url.lastIndexOf('/') + 1);
  } // getId()

  /**
   * @description GET request with base pathe attached to it.
   * @param url
   * @param httpOptions
   */
  public get(url: string, httpOptions?: Object) {
    return this.http.get(this.config.basePath + url, httpOptions);
  } // get()

  public post(url: string, object: object, httpOptions?: Object) {
    return this.http.post(this.config.basePath + url, object, httpOptions);
  } // post()

  /**
   * Get All the data elements and without Paging Information
   * @param modelName
   * @param httpOptions
   */
  findAll(modelName: string, httpOptions?: Object): Observable<ObjectWithLinks[]> {
    return this.http
      .get(this.config.basePath + '/' + modelName, httpOptions)
      .pipe(map((res: any) => res._embedded[modelName]));
  } // findAll

  findAllByProperty(url: string, propertyName: string, httpOptions?: Object) {
    return this.http.get(url, httpOptions).pipe(map((res: any) => res._embedded[propertyName]));
  }

  findOne(item: ObjectWithLinks) {
    return this.http.get<ObjectWithLinks>(item._links.self.href);
  }

  /**
   * Search for all the result
   * @param url
   * @param httpOptions
   */
  public search(url: string, httpOptions?: Object) {
    return this.http.get<HateosPagedResponse>(this.config.basePath + url, httpOptions);
  }

  /** Save thte Object.*/
  save(item: ObjectWithLinks): Observable<ObjectWithLinks> {
    if (item._links) {
      return this.patch(item);
    } else {
      return this.http.post<ObjectWithLinks>(item._links.self.href, item);
    }
  } // save()

  /** Patch the given object.*/
  patch(item: ObjectWithLinks): Observable<ObjectWithLinks> {
    return this.http.patch<ObjectWithLinks>(item._links.self.href, item);
  } // patch

  /** Put the given object. */
  put(item: ObjectWithLinks): Observable<ObjectWithLinks> {
    return this.http.put<ObjectWithLinks>(item._links.self.href, item);
  }

  /** Delete all */
  deleteAllWithConfirm(urls: string[]): Observable<Response[]> {
    return this.showDeleteConfimDialog().pipe(
      filter(result => result),
      mergeMap(() => {
        let requests: Observable<Response>[] = [];
        urls.forEach(url => requests.push(this.http.delete<Response>(this.config.basePath + url)));
        return forkJoin(requests);
      })
    );
  } // deleteAllWithConfirm

  deleteWithConfirm(url: string): Observable<Response> {
    return this.deleteAllWithConfirm([url]).pipe(map(d => d[0]));
  } //  deleteWithConfirm()

  private showDeleteConfimDialog() {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    return dialogRef.afterClosed();
  }
} // class
