import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs/Subscription';
import { finalize } from 'rxjs/operators/finalize';

import { ObjectWithLinks } from '../services';

@Directive({
  selector: '[extApiImage]'
})
export class ApiImageDirective implements OnInit {
  /** URL for the image   */
  @Input() url: string;

  /** In case of mutiple images. Whitch image to to shown */
  @Input() position: number = 0;

  /** Object to extract the image */
  @Input() item: ObjectWithLinks;

  /** Property name for the image */
  @Input() property: string;

  /** Defaut image */
  private defaultImage: string = `data:image/svg+xml,%3csvg fill='%23999999' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 0h24v24H0zm0 0h24v24H0zm21 19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2' fill='none'/%3e%3cpath d='M0 0h24v24H0z' fill='none'/%3e%3cpath d='M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z'/%3e%3c/svg%3e`;

  constructor(private el: ElementRef, private renderer: Renderer, private http: HttpClient) {}

  ngOnInit(): void {
    if (this.item && this.item[this.property]) {
      let imageNames = this.item[this.property];
      // Single image
      if (typeof imageNames == 'string') {
        this.url = this.getFileUrl(imageNames);
      } else {
        let list: string[] = <string[]>imageNames;
        this.url = this.getFileUrl(list[this.position]);
      }
      let sub: Subscription = this.http
        .head(this.url)
        .pipe(finalize(() => this.updateElemnet()))
        .subscribe(() => sub.unsubscribe(), error => (this.url = this.defaultImage));
    } else {
      if (!this.url) this.url = this.defaultImage;
      this.updateElemnet();
    }
  } // ngOnInit()

  private updateElemnet() {
    if (this.el.nativeElement.localName === 'img') {
      this.el.nativeElement.src = this.url;
    } else {
      this.el.nativeElement.style.backgroundImage = 'url(' + this.url + ')';
    }
  } // updateElemnet()

  private getUrl(): string {
    return this.item._links.self.href + '/' + this.property;
  } // getUrl()

  private getFileUrl(fileName: string): string {
    return this.getUrl() + '/' + fileName;
  }
}
