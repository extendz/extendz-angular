/**
 * Copyright 2012-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="./qrcodejs2.d.ts" />
import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChange,
  ChangeDetectionStrategy
} from '@angular/core';

import * as QRCode from 'qrcodejs2';

@Component({
  selector: 'qrcode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ''
})
export class QRGeneratorComponent implements OnChanges, OnInit {
  /** @internal */
  @Input() public qrdata: string = '';
  @Input() public size: number = 256;
  @Input() public level: string = 'M';
  @Input() public colordark: string = '#000000';
  @Input() public colorlight: string = '#ffffff';
  @Input() public usesvg: boolean = false;

  public qrcode: any;

  constructor(public el: ElementRef) {}

  public ngOnInit() {
    try {
      if (!this.isValidQrCodeText(this.qrdata)) {
        throw new Error('Empty QR Code data');
      }
      this.qrcode = new QRCode(this.el.nativeElement, {
        colorDark: this.colordark,
        colorLight: this.colorlight,
        correctLevel: QRCode.CorrectLevel[this.level.toString()],
        height: this.size,
        text: this.qrdata,
        useSVG: this.usesvg,
        width: this.size
      });
    } catch (e) {
      console.error('Error generating QR Code: ' + e.message);
    }
  } //ngOnInit

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (!this.qrcode) {
      return;
    }
    const qrData = changes['qrdata'];
    if (qrData && this.isValidQrCodeText(qrData.currentValue)) {
      this.qrcode.clear();
      this.qrcode.makeCode(qrData.currentValue);
    }
  } //ngOnChanges

  /**
   * @method isValidQrCodeText
   * @param data
   * @description Check wheter data is undefined.
   */
  protected isValidQrCodeText(data: string) {
    return !(typeof data === 'undefined');
  } //isValidQrCodeText
}
