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
import { ApiSearchService } from '../services/api-search.service';

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

  searchText: string;

  @Input() textValue: string = '';

  url: string;
  selector: string;
  @Input() selectorName: string;
  @Input() searchClicked: boolean;

  @Input() model: string;

  @Output() select: EventEmitter<ObjectWithLinks> = new EventEmitter<ObjectWithLinks>();

  tableResponse: TableResponse;
  selection = new SelectionModel<Object>(true, []);

  data: Object[];

  selectedProperty: string;

  //checkbox select
  check: MatCheckboxChange;

  constructor(
    public media: ObservableMedia,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ApiTableService,
    private searchService: ApiSearchService
  ) {}

  ngOnInit() {
    this.searchText = this.textValue;
    this.all$ = this.searchService
      .getModel(this.model)
      .pipe(
        mergeMap((meta: ModelMeta) => this.handleMetaModel(meta)),
        map((tableResponse: TableResponse) => this.handdleDataResponse(tableResponse))
      )
      .subscribe(d => {
        if (this.selectorName != null) {
          this.search(this.selectorName);
        } else {
          this.search(this.selectedProperty);
        }
      });
  } // ngOnInit()

  private handleMetaModel(meta: ModelMeta) {
    this.modelMeta = meta;
    this.columns = meta.properties.map(p => p.name);
    if (this.searchClicked == true) {
      this.allColumns = ['select', ...this.columns];
    } else {
      this.allColumns = ['select', ...this.columns, 'edit'];
    }
    this.selectedProperty = this.allColumns[1];
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

  /** search text value asign */
  applyFilter(filterValue: string) {
    this.searchText = filterValue;
    if (this.selectorName != null) {
      this.search(this.selectorName);
    } else {
      this.search(this.selectedProperty);
    }
  }

  /**If clicked which property wants to search then set value in data table*/
  search(propName: string) {
    this.selectedProperty = propName;
    this.searchService.search(this.selector, this.searchText, propName).subscribe((json: any) => {
      this.data = json;
      this.tableDataSource = new TableDataSource(of(this.data));
    });
  }

  //select checkbox on click event
  checkClicked(event: MatCheckboxChange, item: ObjectWithLinks) {
    this.check = event;
    if (this.check && this.check.checked) {
      this.selection.select(item);
      console.log('cheked true', this.selection.selected);
    } else {
      this.selection.deselect(item);
      console.log('checked false', this.selection.selected);
    }
  }
}
