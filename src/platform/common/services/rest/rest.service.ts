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

import { DeleteDialogComponent } from './dialog-delete/delete-dialog.componet';
import { ExtRestConfig } from '../../services/rest/models';
import { ObjectWithLinks } from './models/';

@Injectable()
export class RestService {
  constructor(
    private restConfig: ExtRestConfig,
    public http: HttpClient,
    public dialog: MatDialog
  ) {}

  getId(url: string) {
    return url.substring(url.lastIndexOf('/') + 1);
  } // getId()

  findAll(modelName: string, httpOptions: Object): Observable<ObjectWithLinks> {
    return this.http
      .get(this.restConfig.basePath + '/' + modelName, httpOptions)
      .pipe(map((res: any) => res._embedded[modelName]));
  } // findAll

  deleteWithConfirm(url: string): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(url);
      }
    });
  } //  delete()
} // class
