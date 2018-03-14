import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Property } from '../../api-browser/api-table/models';
import { ObjectWithLinks, RestService } from '../../common';

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

  constructor(private rest: RestService) {}

  ngOnInit() {
    console.log();
  }

  handleFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      let formData = new FormData();
      formData.append(this.property.name, event.target.files[0]);
      let url = this.item._links.self.href + '/' + this.property.name;

      let sub = this.rest.http.post(url, formData).subscribe(() => {
        sub.unsubscribe();
      });
      //let reader = new FileReader();
      //let file = event.target.files[0];
      //reader.readAsDataURL(file);
      //reader.onload = () => {};
    }
  } // handleFile()
}
