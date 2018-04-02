import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ModelMeta, Property } from '../models';
import { ApiItemService } from '../api-item/api-item.service';
import { ObjectWithLinks } from '../../common/services';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ext-api-item-basic',
  templateUrl: './api-item-basic.component.html',
  styleUrls: ['./api-item-basic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiItemBasicComponent implements OnInit {
  /**
   * Main meta model
   */
  @Input() modelMeta: ModelMeta;
  /**
   * Main editing item
   */
  @Input() item: ObjectWithLinks;
  /**
   * Binding property
   */
  @Input() property: Property;
  /**
   * Fire when save/post completed
   */
  @Output() save: EventEmitter<ObjectWithLinks> = new EventEmitter();
  /**
   * Form used to create an item(Entity)
   */
  itemFormGroup: FormGroup = new FormGroup({});

  objectItems: ObjectWithLinks[] = [];
  propertyMap: Object = {};

  constructor(private service: ApiItemService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.handleMetaModel();
  }

  private handleMetaModel() {
    this.modelMeta.properties.forEach(property => {
      let formCtrl = new FormControl();
      if (property.mappedBySource) {
        let url = this.item._links.self.href + '/' + property.mappedBySource;
        let s = this.service.rest.findAllByProperty(url, property.mappedBySource);
        this.propertyMap[property.name] = s;
        // .subscribe(d => {
        //   this.propertyMap.set(property.name, d);
        //   console.log("setting property",property.name)
        // });
      }
      if (property.required) formCtrl.setValidators(Validators.required);
      this.itemFormGroup.addControl(property.name, formCtrl);
    });
  } // handleResponse()
  /**
   * Post Request
   */
  submitForm(): void {
    if (this.itemFormGroup.valid) {
      // Append the relationship to the model
      let savingObject = this.itemFormGroup.value;
      savingObject[this.property.mappedBy] = this.item._links.self.href;
      this.service.save(savingObject, this.modelMeta).subscribe(
        (response: ObjectWithLinks) => {
          this.snackBar.open('Saved', '', { duration: 1000 });
          this.save.emit(response);
        },
        error => this.handleErrors(error)
      );
    }
  } // save()

  getItems(property: string) {
    let url: string = this.item._links[property].toString();
    this.service.rest.findAllByProperty(url, property).subscribe(d => {
      console.log(d);
    });
    // let sub = this.service.rest
    // .findAllByProperty(this.item._links.self.href, this.property.mappedBySource)
    // .subscribe(d => {
    //   this.objectItems = d;
    //   console.log('GOt objects', d);
    //   sub.unsubscribe();
    // });
  }

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
}
