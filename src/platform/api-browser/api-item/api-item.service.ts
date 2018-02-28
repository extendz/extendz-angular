import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ModelMeta, ObjectWithLinks } from '../api-table/models';
import { RestService } from '../../common';

@Injectable()
export class ApiItemService {
  constructor(private rest: RestService) {}

  getItem(meta: ModelMeta, id: number | string): Observable<ObjectWithLinks> {
    if (id == 0) {
      return of({});
    }
    return this.rest.http.get<ObjectWithLinks>(meta.url + '/' + id);
  } // getItem()

  save(item: ObjectWithLinks, meta: ModelMeta): Observable<ObjectWithLinks> {
    // if object has links that means they are already saved.The have to be patched.
    if (item._links) {
      return this.patch(item);
    }
    return this.rest.http.post<ObjectWithLinks>(meta.url, item);
  } // save()

  delete(item: ObjectWithLinks) {
    this.rest.deleteWithConfirm(item._links.self.href);
  } // delete

  patch(item: ObjectWithLinks): Observable<ObjectWithLinks> {
    return this.rest.http.patch<ObjectWithLinks>(item._links.self.href, item);
  } // patch
} // class
