import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { Property, ModelMeta } from '../api-table/models';
import { MatDialog } from '@angular/material';
import { ApiItemAddDialogComponent } from '../api-item/dialog/api-item-add-dialog.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ApiTableService } from '../api-table/api-table.service';
import { Subscription } from 'rxjs/Subscription';

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
  displayValue: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(public dialog: MatDialog, private apiTableService: ApiTableService) {}

  ngOnInit() {
    this.all$ = this.apiTableService.getModel(this.property.name).subscribe(
      (meta: ModelMeta) => {
        this.modelMeta = meta;
        this.disabled = false;
      },
      error => {
        //console.log(error.status);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.all$) this.all$.unsubscribe();
  }
  /**
   * Show a selection dialog.
   *
   * @param property Selected Property
   */
  openDialog(property: Property): void {
    let dialogRef = this.dialog.open(ApiItemAddDialogComponent, {
      width: '100vw',
      data: property
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item = result[0];
        if (this.modelMeta.title) this.displayValue = this.item[this.modelMeta.title];
        else this.displayValue = result[0]._links.self.href;
        
        this.value = result[0]._links.self.href;
        // this.itemFormGroup.controls[property.name].patchValue(result[0]);
      }
    });
  } // openDialog()

  get value() {
    return this.item;
  }

  set value(val: Object) {
    //this.item = val;
    this.onChange(val);
    this.onTouched();
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

  setDisabledState?(isDisabled: boolean): void {}
}
