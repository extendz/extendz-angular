import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatMenu, MatMenuTrigger, MatSnackBar } from '@angular/material';

import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';

import { Image } from './models/image';
import { Property, RelationTypes } from '../../api-browser/api-table/models';
import { RestService, ObjectWithLinks } from '../../common/services';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'ext-file-upload',
  templateUrl: './extendz-file-upload.component.html',
  styleUrls: ['./extendz-file-upload.component.css']
})
export class ExtendzFileUploadComponent implements OnInit {
  /**
   * Property
   */
  @Input() property: Property;
  /**
   * Saved item
   */
  @Input() item: ObjectWithLinks;

  images: Image[] = [];

  allowMultiple: boolean = false;

  constructor(private rest: RestService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    if (this.property.relationShipType === RelationTypes.MULTIPLE) {
      this.allowMultiple = true;
    }

    this.updateImageList();
  } // ngOnInit()

  updateImageList(): void {
    if (this.item[this.property.name]) {
      let imageNames = this.item[this.property.name];
      // Single image
      if (typeof imageNames == 'string') {
        this.images = [new Image(this.getFileUrl(imageNames))];
      } else {
        let list: string[] = <string[]>imageNames;
        list.forEach(imageName => {
          this.images.push(new Image(this.getFileUrl(imageName), false));
        });
      }
    } // if
  } // updateImageList

  uploadFile(file: File, image: Image): any {
    let formData = new FormData();
    formData.append(this.property.name, file);
    let rest$ = this.rest.http
      .post(this.getUrl(), formData)
      .pipe(
        map((fileNames: string[]) => {
          if (this.property.relationShipType != RelationTypes.MULTIPLE) {
            this.item[this.property.name] = fileNames[0];
          } else {
            // Add existing
            let current: any = this.item[this.property.name];
            this.item[this.property.name] = fileNames.concat(current);
          }
          return this.item;
        }),
        mergeMap((item: ObjectWithLinks) => this.rest.save(item))
      )
      .subscribe(
        (saved: ObjectWithLinks) => {
          //this.item = saved;
          image.loading = false;
          rest$.unsubscribe();
        },
        error => {
          this.snackBar.open('Upload failed', null, { duration: 3000 });
          image.loading = false;
          image.broken = true;
        }
      );
  } // uploadFile()

  handleFile(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    // initialize the image list
    for (let index = 0; index < target.files.length; index++) {
      const file = target.files[index];
      let uploadingImage = new Image();
      uploadingImage.loading = true;
      let reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        uploadingImage.url = reader.result;
        this.images.unshift(uploadingImage);
        this.uploadFile(file, uploadingImage);
      };
      reader.readAsDataURL(file);
    }
    if (1 === 1) return;

    /**
     * There should be at least one image selected.
     */
    if (target.files && target.files.length > 0) {
      // Create form data
      let formData = new FormData();
      let files = target.files;
      for (var i = 0, numFiles = files.length; i < numFiles; i++) {
        let file = files[i];
        formData.append(this.property.name, file);
      }

      let rest$ = this.rest.http
        .post(this.getUrl(), formData)
        .pipe(
          map((fileNames: string[]) => {
            if (this.property.relationShipType != RelationTypes.MULTIPLE) {
              this.item[this.property.name] = fileNames[0];
            } else {
              // Add existing
              let current: any = this.item[this.property.name];
              this.item[this.property.name] = fileNames.concat(current);
            }
            return this.item;
          }),
          mergeMap((item: ObjectWithLinks) => this.rest.save(item))
        )
        .subscribe((saved: ObjectWithLinks) => {
          this.item = saved;
          this.updateImageList();
          rest$.unsubscribe();
        });
    }
  } // handleFile()

  private getUrl(): string {
    return this.item._links.self.href + '/' + this.property.name;
  } // getUrl()

  private getFileUrl(fileName: string): string {
    return this.getUrl() + '/' + fileName;
  }
} // class

//let reader = new FileReader();
//let file = event.target.files[0];
//reader.readAsDataURL(file);
//reader.onload = () => {};
