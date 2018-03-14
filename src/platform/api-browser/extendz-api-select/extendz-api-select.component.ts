import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';

import { DialogData } from '../api-item/dialog/models/dialogData';
import { Property, ModelMeta, TableResponse, RelationTypes } from '../api-table/models';
import { ApiItemAddDialogComponent } from '../api-item/dialog/api-item-add-dialog.component';
import { ApiTableService } from '../api-table/api-table.service';
import { ObjectWithLinks } from '../../index';

@Component({
  selector: 'ext-api-select',
  templateUrl: './extendz-api-select.component.html',
  styleUrls: ['./extendz-api-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ExtendzApiSelectComponent)
    }
  ]
})
export class ExtendzApiSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  /**
   * Selected Property
   */
  @Input() property: Property;
  /**
   * Meta data for selected property
   */
  modelMeta: ModelMeta;
  /**
   * All subscriptions
   */
  all$: Subscription;
  /**
   * Dissabled state
   */
  disabled: boolean = true;
  /**
   * Selected item
   */
  item: Object[];
  /**
   * When selected with the dialog box the first element response it taken to consideration.
   */
  response: ObjectWithLinks[];
  /**
   * Display value for the current value.
   * Seperation is needed since the acctual selected value is an URL and the display values is a human readble text.
   */
  displayValue: string = '';
  /**
   * On Change the selected form value
   */
  onChange: any = () => {};
  /**
   *On Touch the api selector
   */
  onTouched: any = () => {};

  constructor(public dialog: MatDialog, private apiTableService: ApiTableService) {}

  ngOnInit() {
    this.all$ = this.apiTableService.getModel(this.property.reference).subscribe(
      (meta: ModelMeta) => {
        this.modelMeta = meta;
        this.disabled = false;
      },
      error => {
        //console.log(error.status);
      }
    );
  } // ngOnInit()

  ngOnDestroy(): void {
    if (this.all$) this.all$.unsubscribe();
  } // ngOnDestroy()

  /**
   * Show a selection dialog.
   *
   * @param property Selected Property
   */
  openDialog(property: Property): void {
    let data: DialogData = {
      property,
      response: []
    };
    if (this.response) {
      data.response = [...data.response, ...this.response];
    }
    let dialogRef = this.dialog.open(ApiItemAddDialogComponent, {
      width: '100vw',
      data
    });
    dialogRef.afterClosed().subscribe((result: string[]) => {
      /**
       * Selected items will be send as an array. Even with for single selection.
       */
      if (result && result.length === 1) {
        this.getResponse(result[0]);
      } else if (result) {
        this.handleDialogMultipleSection(result);
      }
    });
  } // openDialog()

  private handleDialogMultipleSection(results: string[]) {
    // Get a display value
    let res: Subscription = this.apiTableService
      .getItem(results[0])
      .pipe(take(1))
      .subscribe((response: ObjectWithLinks) => {
        this.response = [response];
        this.value = results;
        if (this.modelMeta.title) {
          let str: any = response[this.modelMeta.title];
          this.displayValue = str;
          if (results.length > 1) {
            this.displayValue = this.displayValue + ' ,' + (results.length - 1) + ' more...';
          }
        }
        res.unsubscribe();
      });
  } // handleDialogMultipleSection()

  get value() {
    return this.item;
  }

  set value(val: Object) {
    // If the value changed then get the reponse.Otherwise there will be a loop
    //if (this.item !== val) this.getResponse(val);
    if (!this.response) this.getResponse(val);
    this.item = [val];
    this.onChange(val);
    this.onTouched();
  }

  private getItem(url: any) {
    return this.apiTableService.getItem(url).pipe(take(1));
  }

  private getResponse(url: any) {
    let res: Subscription = this.apiTableService
      .getItem(url)
      .pipe(take(1))
      .subscribe((response: any) => {
        console.log(response);
        let tableResponse: TableResponse = response;
        if (tableResponse._embedded && tableResponse._embedded[this.property.name]) {
          this.handleMultipleResponse(tableResponse);
        } else {
          let singleResponse: ObjectWithLinks = response;
          this.handleSingleResponse(singleResponse);
        }
        //this.handleResponse(response, selectedObjects);
      });
  } // getResponse()

  private handleMultipleResponse(response: TableResponse) {
    let data: ObjectWithLinks[] = response._embedded[this.property.name];
    this.response = data;
    if (data.length !== 0) {
      let firstItem = data[0];
      if (this.modelMeta.title) {
        let str: any = firstItem[this.modelMeta.title];
        this.displayValue = str;
        if (data.length) {
          this.displayValue = this.displayValue + ' ,and ' + (data.length - 1) + ' more...';
        }
      }
    }
  } // handleMultipleResponse()

  private handleSingleResponse(response: ObjectWithLinks) {
    this.response = [response];
    this.value = response._links.self.href;
    let item: any = response;
    //this.response = response;
    if (this.modelMeta.title) {
      this.displayValue = item[this.modelMeta.title];
    } else {
      this.displayValue = response._links.self.href;
    }
  } // handleSingleResponse()

  private handleResponse(response: ObjectWithLinks | TableResponse, selectedObjects: number) {
    switch (this.property.relationShipType) {
      case RelationTypes.MULTIPLE:
        console.log('tavle response', response);
        //this.value = response;
        let tableResponse: TableResponse = response;
        let data: ObjectWithLinks[] = tableResponse._embedded[this.property.name];
        if (data.length === 0) {
        }
        break;
      case RelationTypes.SINGLE:
        // this.item = response;
        let item: any = response;
        //this.response = response;
        if (this.modelMeta.title) {
          this.displayValue = item[this.modelMeta.title];
          if (selectedObjects) {
            this.displayValue = this.displayValue + ' ,and ' + (selectedObjects - 1) + ' more';
          }
        } else {
          // this.displayValue = response._links.self.href;
        }
        break;
    }
    // this.value = response._links.self.href;
  } //handleResponse

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

  setDisabledState?(isDisabled: boolean): void {}
}
