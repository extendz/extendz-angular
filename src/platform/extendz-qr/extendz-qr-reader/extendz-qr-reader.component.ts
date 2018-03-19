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
import { Component, VERSION, OnInit, ViewChild } from '@angular/core';

import { ZXingScannerComponent } from './zxing-scanner/zxing-scanner.module';

import { Result } from '@zxing/library';
@Component({
  selector: 'extendz-qr-reader',
  templateUrl: './extendz-qr-reader.component.html',
  styleUrls: ['./extendz-qr-reader.component.css']
})
export class ExtendzQrReaderComponent implements OnInit {
  ngVersion = VERSION.full;

  @ViewChild('scanner') scanner: ZXingScannerComponent;

  hasCameras = false;
  qrResultString: string;
  qrResult: Result;
  scannerEnabled = true;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      // selects the devices's back camera by default
      // for (const device of devices) {
      //     if (/back|rear|environment/gi.test(device.label)) {
      //         this.scanner.changeDevice(device);
      //         this.selectedDevice = device;
      //         break;
      //     }
      // }
    });

    this.scanner.scanComplete.subscribe((result: Result) => {
      this.qrResult = result;
    });
  } //ngOnInit

  /**
   *
   * @param cameras
   */
  displayCameras(cameras: MediaDeviceInfo[]) {
    console.log('Devices: ', cameras);
    this.availableDevices = cameras;
  } //displayCameras

  /**
   *
   * @param resultString
   */
  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    this.qrResultString = resultString;
  } //handleQrCodeResult

  /**
   *
   * @param selectedValue
   */
  onDeviceSelectChange(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  } //onDeviceSelectChange
}
