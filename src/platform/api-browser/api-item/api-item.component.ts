import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs/Subscription';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { ApiItemService } from './api-item.service';
import { ApiTableService } from '../api-table/api-table.service';

import { ApiItemAddDialogComponent } from './dialog/api-item-add-dialog.component';

import { ModelMeta, ObjectWithLinks, Property } from '../api-table/models';

@Component({
  selector: 'app-api-item',
  templateUrl: './api-item.component.html',
  styleUrls: ['./api-item.component.css']
})
export class ApiItemComponent implements OnInit, OnDestroy {
  all$: Subscription;
  modelMeta: ModelMeta;
  id: number | string;
  itemFormGroup: FormGroup = new FormGroup({});
  item: ObjectWithLinks;

  constructor(
    private media: ObservableMedia,
    private activatedRoute: ActivatedRoute,
    private apiTableService: ApiTableService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private service: ApiItemService
  ) {} // constructor()

  ngOnInit(): void {
    this.all$ = this.activatedRoute.params
      .pipe(
        mergeMap((param: Params) => this.handleParam(param)),
        mergeMap((meta: ModelMeta) => this.handleMetaModel(meta))
      )
      .subscribe(
        (response: ObjectWithLinks) => {
          this.item = response;
          this.modelMeta.properties.forEach((prop: Property) => {
            this.itemFormGroup.controls[prop.name].patchValue(response[prop.name]);
          });
          if (response._links) {
            this.itemFormGroup.controls['_links'].patchValue(response._links);
          }
        },
        err => {
          this.snackBar.open(err.message, '', {
            duration: 3000
          });
        }
      );
  } // ngOnInit()

  ngOnDestroy(): void {
    this.all$.unsubscribe();
  } // ngOnDestroy()

  save(): void {
    let saved: Subscription = this.service.save(this.itemFormGroup.value, this.modelMeta).subscribe(
      saved => {
        this.snackBar.open('Saved', '', { duration: 1000 });
      },
      error => this.handleErrors(error)
    );
    this.all$.add(saved);
  } // save()

  delete(): void {
    console.log(this.item._links.self)
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

  openDialog(): void {
    let dialogRef = this.dialog.open(ApiItemAddDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private handleParam(param: Params) {
    this.id = param.id;
    return this.apiTableService.getModel(param.name);
  } // handleParam()

  private handleMetaModel(meta: ModelMeta) {
    this.modelMeta = meta;
    this.modelMeta.properties.forEach(prop => {
      let testCtrl = new FormControl('init value');
      this.itemFormGroup.addControl(prop.name, testCtrl);
    });

    // _links ctrl
    let _links = new FormControl();
    this.itemFormGroup.addControl('_links', _links);

    return this.service.getItem(this.modelMeta, this.id);
  } // handleMetaModel()
} // class
