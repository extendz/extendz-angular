import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Property, RelationTypes } from '../../api-browser/api-table/models';
import { ObjectWithLinks, RestService } from '../../common';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { forEach } from '@angular/router/src/utils/collection';
import { MatMenu, MatMenuTrigger } from '@angular/material';

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

  imageUrls: string[];

  allowMultiple: boolean = false;

  constructor(private rest: RestService) {}

  ngOnInit() {
    if (this.property.relationShipType === RelationTypes.MULTIPLE) {
      this.allowMultiple = true;
    }

    this.updateImageList();
  } // ngOnInit()

  updateImageList(): void {
    this.imageUrls = [];
    if (this.item[this.property.name]) {
      let imageNames = this.item[this.property.name];
      // Single image
      if (typeof imageNames == 'string') {
        this.imageUrls = [this.getFileUrl(imageNames)];
      } else {
        let list: string[] = <string[]>imageNames;
        list.forEach(imageName => {
          this.imageUrls.push(this.getFileUrl(imageName));
        });
      }
    } // if
  }

  handleFile(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    //this.imageUrls.unshift('local');
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

      this.rest.http
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
