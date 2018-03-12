/**
 *    Copyright 2018 user
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

import {
  Component,
  OnInit,
  Output,
  Input,
  forwardRef,
  ViewChild,
  EventEmitter,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { MatInput, MatSelectionListChange, MatDialog } from '@angular/material';

import { map } from 'rxjs/operators/map';
import { ObjectWithLinks, ModelMeta } from '../api-table/models';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { DialogComponent } from './dialog/dialog.component';
import { TableDataSource } from '../api-table/dataSource/tableDataSource';
import { ApiTableService } from '../api-table/api-table.service';
import { ApiSearchService } from '../services/api-search.service';

@Component({
  selector: 'app-api-selector',
  templateUrl: './api-selector.component.html',
  styleUrls: ['./api-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ApiSelectorComponent)
    }
  ]
})
export class ApiSelectorComponent implements OnInit, ControlValueAccessor {
  @Input() model: string;
  @Input() selector: string;
  @Input() placeholder: string;

  @Output() selected: EventEmitter<string[]> = new EventEmitter<string[]>();

  items$: Observable<ObjectWithLinks>;
  item: Object;

  url: string;
  urlName: string;

  search: FormGroup = new FormGroup({});
  searchController: FormControl;

  textValue: string;
  selectLinks: string;
  selectValue: ObjectWithLinks;
  selectedData: Object;
  searchClicked = true;
  columns: string[];
  onChange: any = () => {};
  onTouched: any = () => {};

  linkArray: string[] = [];
  dataArray: Object[] = [];
  values: string[] = [];

  constructor(
    public dialog: MatDialog,
    private tableService: ApiTableService,
    private apiSearchService: ApiSearchService
  ) {
    this.searchController = new FormControl('');
    this.items$ = this.searchController.valueChanges.pipe(
      debounceTime(1000),
      mergeMap((searchText: string) =>
        this.apiSearchService.search(this.urlName, searchText, this.selector)
      )
    );
    this.search.addControl('search', this.searchController);
  } // constructor()

  get value() {
    return this.item;
  }

  set value(val: Object) {
    this.item = val;
    this.onChange(val);
    this.onTouched();
  }

  change(item: ObjectWithLinks): void {
    this.value = item._links.self.href;
  } // change()

  ngOnInit() {
    this.apiSearchService.getModel(this.model).subscribe(json => {
      this.url = json.url;
      this.urlName = this.url.substring(this.url.lastIndexOf('/') + 1);
    });
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  writeValue(value: Object): void {
    if (value) {
      this.value = value;
    }
  } // writeValue()

  selectionChange(event: ObjectWithLinks, itemName: ObjectWithLinks) {
    this.selectValue = event;
    this.selectLinks = itemName._links.self.href;
    this.selectedData = itemName.name;
    if (this.selectValue.selected == true) {
      this.linkArray.push(this.selectLinks);
      this.dataArray.push(this.selectedData);
    } else {
      if (this.linkArray.includes(this.selectLinks) || this.dataArray.includes(this.selectedData)) {
        this.linkArray.splice(this.linkArray.indexOf(this.selectLinks), 1);
        this.dataArray.splice(this.dataArray.indexOf(this.selectedData), 1);
      }
    }
    this.selected.emit(this.linkArray);
  } //selectionChange event of checkbox click.

  setDisabledState?(isDisabled: boolean): void {}

  openDialog(): void {
    this.textValue = this.searchController.value;
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '100%',
      height: '100%',
      data: {
        textValue: this.textValue,
        model: this.model,
        selectorName: this.selector,
        searchClicked: this.searchClicked
      }
    });
    console.log(this.textValue);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } //dialog box open.
}
