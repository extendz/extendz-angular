import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { Property, ModelMeta } from '../api-table/models';
import { MatDialog } from '@angular/material';
import { ApiItemAddDialogComponent } from '../api-item/dialog/api-item-add-dialog.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ApiTableService } from '../api-table/api-table.service';
import { Subscription } from 'rxjs/Subscription';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { ObjectWithLinks } from '../../index';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';
import { DialogData } from '../api-item/dialog/models/dialogData';

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
  @Input() property: Property;
  modelMeta: ModelMeta;
  all$: Subscription;
  disabled: boolean = true;

  item: Object;
  response: ObjectWithLinks;
  displayValue: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(public dialog: MatDialog, private apiTableService: ApiTableService) {}

  ngOnInit() {
    this.apiTableService.getModel(this.property.reference).subscribe(
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
  }

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
      data.response = [...data.response, this.response];
    }
    let dialogRef = this.dialog.open(ApiItemAddDialogComponent, {
      width: '100vw',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getResponse(result[0]);
      }
    });
  } // openDialog()

  get value() {
    return this.item;
  }

  set value(val: Object) {
    // If the value changed then get the reponse.Otherwise there will be a loop
    if (this.item != val) this.getResponse(val);
    this.item = val;
    this.onChange(val);
    this.onTouched();
  }

  private getResponse(url: any) {
    let res: Subscription = this.apiTableService
      .getItem(url)
      .pipe(take(1))
      .subscribe((response: ObjectWithLinks) => {
        this.handleResponse(response);
      });
  } // getResponse()

  private handleResponse(response: ObjectWithLinks) {
    // this.item = response;
    let item: any = response;
    this.response = response;
    if (this.modelMeta.title) this.displayValue = item[this.modelMeta.title];
    else this.displayValue = response._links.self.href;
    this.value = response._links.self.href;
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
