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

import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs/Subscription';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { ApiItemService } from './api-item.service';
import { ApiTableService } from '../api-table/api-table.service';

import { ObjectWithLinks, ModelMeta, Property } from '../../common';

@Component({
  selector: 'ext-api-item',
  templateUrl: './api-item.component.html',
  styleUrls: ['./api-item.component.css']
})
export class ApiItemComponent implements OnInit, OnDestroy {
  all$: Subscription;
  modelMeta: ModelMeta;
  properties: Property[];
  item: ObjectWithLinks;
  /**
   * Id for the selected item
   */
  @Input() id: number | string;
  /**
   * Model name for the selected/new item
   */
  @Input() model: string;
  /**
   * Form used to create an item(Entity)
   */
  itemFormGroup: FormGroup = new FormGroup({});

  constructor(
    public media: ObservableMedia,
    private apiTableService: ApiTableService,
    private snackBar: MatSnackBar,
    private service: ApiItemService
  ) {} // constructor()

  ngOnInit(): void {
    this.apiTableService
      .getModel(this.model)
      .pipe(mergeMap((meta: ModelMeta) => this.handleMetaModel(meta)))
      .subscribe(
        (res: ObjectWithLinks) => {
          this.handleResponse(res);
        },
        err => {
          this.snackBar.open(err.message, '', {
            duration: 3000
          });
        }
      );
  } // ngOnInit()

  ngOnDestroy(): void {
    if (this.all$) this.all$.unsubscribe();
  } // ngOnDestroy()

  save(): void {
    //  console.log(this.itemFormGroup.value)
    if (this.itemFormGroup.valid) {
      this.all$ = this.service.save(this.itemFormGroup.value, this.modelMeta).subscribe(
        (res: ObjectWithLinks) => {
          this.handleResponse(res);
          this.id = this.service.rest.getId(res._links.self.href);
          this.snackBar.open('Saved', '', { duration: 1000 });
        },
        error => this.handleErrors(error)
      );
    }
  } // save()

  private handleResponse(response: ObjectWithLinks) {
    this.item = response;
    this.modelMeta.properties.forEach((prop: Property) => {
      if (response._links && response._links[prop.name]) {
        let val: any = response._links[prop.name];
        this.itemFormGroup.controls[prop.name].patchValue(val.href);
      } else this.itemFormGroup.controls[prop.name].patchValue(response[prop.name]);
    });

    // Manualy inject the _links.
    if (response._links) {
      this.itemFormGroup.controls['_links'].patchValue(response._links);
    }
  } // handleResponse()

  private handleMetaModel(meta: ModelMeta) {
    this.modelMeta = meta;
    this.properties = meta.properties.filter(p => p.type !== 'file');
    this.modelMeta.properties.forEach(prop => {
      let testCtrl = new FormControl();
      if (prop.required) testCtrl.setValidators(Validators.required);
      this.itemFormGroup.addControl(prop.name, testCtrl);
    });

    // _links ctrl
    let _links = new FormControl();
    this.itemFormGroup.addControl('_links', _links);
    return this.service.getItem(this.modelMeta, this.id);
  } // handleMetaModel()

  delete(): void {
    this.service.delete(this.item);
  } // delete

  private handleErrors(httpErrorResponse: HttpErrorResponse) {
    let message = httpErrorResponse.message;

    if (httpErrorResponse.error) {
      message = httpErrorResponse.error.message;
    }

    if (httpErrorResponse.status == 409) {
      message = 'Duplicate entry';
    }

    this.snackBar.open(message, '', {
      duration: 3000
    });
  } // handleErrors()
} // class
