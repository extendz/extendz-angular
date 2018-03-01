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
import { PageEvent } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { ApiTableService } from './api-table.service';
import { ModelMeta } from './models/modelMeta';

import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { tap } from 'rxjs/operators/tap';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { of } from 'rxjs/observable/of';

import { TableResponse } from './models/modelData/tableResponse';
import { PageAndSort } from './models';

import { TableDataSource } from './dataSource/tableDataSource';
import { ObjectWithLinks } from './models/modelData/objectWithLinks';

@Component({
  selector: 'app-api-table',
  templateUrl: './api-table.component.html',
  styleUrls: ['./api-table.component.css']
})
export class ApiTableComponent implements OnInit, OnDestroy {
  all$: Subscription;
  tableDataSource: TableDataSource;
  columns: string[];
  allColumns: string[];
  modelMeta: ModelMeta;

  url: string;
  selector: string;
  @Input() selectorName: string;
  @Input() searchClicked: boolean;

  @Input() model: string;

  @Output() select: EventEmitter<ObjectWithLinks> = new EventEmitter<ObjectWithLinks>();

  tableResponse: TableResponse;
  selection = new SelectionModel<Object>(true, []);

  data: Object[];

  constructor(
    public media: ObservableMedia,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ApiTableService
  ) {}

  ngOnInit() {
    this.all$ = this.service
      .getModel(this.model)
      .pipe(
        mergeMap((meta: ModelMeta) => this.handleMetaModel(meta)),
        map((tableResponse: TableResponse) => this.handdleDataResponse(tableResponse))
      )
      .subscribe(d => {});
  } // ngOnInit()

  private handleMetaModel(meta: ModelMeta) {
    this.modelMeta = meta;
    this.columns = meta.properties.map(p => p.name);
    this.allColumns = ['select', ...this.columns, 'edit'];
    return this.service.getTableData(meta);
  } // handleMetaModel()

  private handdleDataResponse(tableResponse: TableResponse) {
    this.tableResponse = tableResponse;
    this.url = this.modelMeta.url;
    this.selector = this.url.substring(this.url.lastIndexOf('/') + 1);
    this.data = tableResponse._embedded[this.selector];
    console.log('data', this.data);
    this.tableDataSource = new TableDataSource(of(this.data));
  } // handdleDataResponse()

  /**
   * Fire when add new item clicked
   */
  public addNew() {
    this.select.emit({});
  } // addNew()

  pageEvent(event: PageEvent) {
    let pageAndSort: PageAndSort = {
      page: event.pageIndex,
      size: event.pageSize
    };
    this.service
      .getTableData(this.modelMeta, pageAndSort)
      .subscribe((tableResponse: TableResponse) => this.handdleDataResponse(tableResponse));
  } // pageEvent()

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  editRow(item: ObjectWithLinks) {
    let id = this.service.getItemId(item._links.self.href);
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  } // editRow()

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach(row => this.selection.select(row));
  }
  ngOnDestroy(): void {
    if (this.all$) this.all$.unsubscribe();
  } // ngOnDestroy()

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   console.log('filter value:', filterValue);
  //   this.selectorService
  //     .search(this.selector, filterValue, this.selectorName)
  //     .pipe(debounceTime(1000))
  //     .subscribe((json: any) => {
  //       this.data = json;
  //       console.log('data2', json);
  //       this.tableDataSource = new TableDataSource(of(this.data));
  //     });
  // }
}
