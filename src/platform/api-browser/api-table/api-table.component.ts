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

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent, MatCheckboxChange } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';

import { ApiTableService } from './api-table.service';
import { TableDataSource } from './dataSource/tableDataSource';

import { PageAndSort } from '../models';
import { ObjectWithLinks, HateosPagedResponse, ModelMeta, Property } from '../../common';

@Component({
  selector: 'ext-api-table',
  templateUrl: './api-table.component.html',
  styleUrls: ['./api-table.component.scss']
})
export class ApiTableComponent implements OnInit, OnDestroy {
  /**
   * All Subscriptions
   */
  all$: Subscription;
  /**
   * Data table instance
   */
  tableDataSource: TableDataSource;
  /**
   * Collumns in the model meta
   */
  columns: string[];
  /**
   * All columns including select and edit
   */
  allColumns: string[];
  modelMeta: ModelMeta;
  tableResponse: HateosPagedResponse;
  data: Object[];

  url: string;
  selector: string;
  @Input() selectorName: string;

  @Input() searchClicked: boolean;
  /**
   * Selected model name
   */
  @Input() model: string;
  /**
   * Table to have multiple selection
   */
  @Input() multiSelect: boolean = true;
  /**
   * Fire on selecting and item or empty one to indicate a emty item
   */
  @Output() select: EventEmitter<ObjectWithLinks> = new EventEmitter<ObjectWithLinks>();
  /**
   * Selected Items
   */
  @Input() selected: string[];
  @Output() selectedChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  /**
   * Selection model
   */
  selection: SelectionModel<string>;

  constructor(
    public media: ObservableMedia,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ApiTableService
  ) {}

  ngOnInit() {
    this.selection = new SelectionModel<string>(this.multiSelect, []);
    this.all$ = this.service
      .getModel(this.model, 'dataTable')
      .pipe(
        mergeMap((meta: ModelMeta) => this.handleMetaModel(meta)),
        map((tableResponse: HateosPagedResponse) => this.handdleDataResponse(tableResponse))
      )
      .subscribe(d => {
        // Select the values from input
        if (this.selected) this.selected.forEach((row: string) => this.selection.select(row));
      });
  } // ngOnInit()

  private handleMetaModel(meta: ModelMeta) {
    this.modelMeta = meta;
    let properties: Property[] = null;
    let projections = meta.projections;
    properties = meta.properties;
    this.columns = properties.filter(r => r.type !== 'file').map(p => p.name);
    this.allColumns = ['select', ...this.columns, 'edit'];
    return this.service.getTableData(meta);
  } // handleMetaModel()

  private handdleDataResponse(tableResponse: HateosPagedResponse) {
    this.tableResponse = tableResponse;
    this.url = this.modelMeta.url;
    this.selector = this.url.substring(this.url.lastIndexOf('/') + 1);
    this.data = tableResponse._embedded[this.selector];
    this.tableDataSource = new TableDataSource(of(this.data));
  } // handdleDataResponse()

  /**
   * Fire when add new item clicked
   */
  public addNew() {
    this.select.emit({});
  } // addNew()

  /**
   * Fire When existing item it clicked
   * @param item
   */
  public editRow(item: ObjectWithLinks) {
    this.select.emit(item);
  } // editRow()

  pageEvent(event: PageEvent) {
    let pageAndSort: PageAndSort = {
      page: event.pageIndex,
      size: event.pageSize
    };
    this.service
      .getTableData(this.modelMeta, pageAndSort)
      .subscribe((tableResponse: HateosPagedResponse) => this.handdleDataResponse(tableResponse));
  } // pageEvent()

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  } // isAllSelected()

  delete(item: ObjectWithLinks) {
    this.service.rest.deleteWithConfirm(item._links.self.href);
  }

  deleteAll() {
    this.service.rest.deleteAllWithConfirm(this.selection.selected);
  }

  selectionChange(event: MatCheckboxChange) {
    this.selected = this.selection.selected;
    this.selectedChange.emit(this.selected);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row: ObjectWithLinks) => this.selection.select(row._links.self.href));
  }

  ngOnDestroy(): void {
    if (this.all$) this.all$.unsubscribe();
  } // ngOnDestroy()
}
