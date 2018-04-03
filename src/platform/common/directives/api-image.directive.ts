import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { ObjectWithLinks } from '../services';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[extApiImage]'
})
export class ApiImageDirective implements OnInit {
  /**
   * URL for the image.
   */
  @Input() url: string;

  @Input() item: ObjectWithLinks;

  @Input() property: string;

  private defaultImage: string = 'data:image/svg+xml;utf8,<svg fill="#999999" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';

  constructor(private el: ElementRef, private renderer: Renderer) {}

  ngOnInit(): void {
    if (this.item && this.item[this.property]) {
      let imageNames = this.item[this.property];
      // Single image
      if (typeof imageNames == 'string') {
        this.url = this.getFileUrl(imageNames);
      } else {
        let list: string[] = <string[]>imageNames;
        this.url = this.getFileUrl(list[0]);
      }
    }

    if (this.el.nativeElement.localName === 'img') {
      this.el.nativeElement.src = this.url;
    } else {
      this.el.nativeElement.style.backgroundImage = 'url(' + this.url + ')';
    }
  }

  private getUrl(): string {
    return this.item._links.self.href + '/' + this.property;
  } // getUrl()

  private getFileUrl(fileName: string): string {
    return this.getUrl() + '/' + fileName;
  }
}
