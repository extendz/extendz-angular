import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { ObjectWithLinks } from '../services';

@Directive({
  selector: '[extApiImage]',
})
export class ApiImageDirective implements OnInit {
  /**
   * URL for the image.
   */
  @Input() url: string;

  @Input() item: ObjectWithLinks;

  @Input() property: string;

  constructor(private el: ElementRef,private renderer: Renderer) {
    //renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'white');
  }

  ngOnInit(): void {
    console.log(this.url)
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
