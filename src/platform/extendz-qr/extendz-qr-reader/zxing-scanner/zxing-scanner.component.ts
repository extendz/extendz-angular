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
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { Result } from '@zxing/library';

import { BrowserQRCodeReader } from './browser-qr-code-reader';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'zxing-scanner',
  templateUrl: './zxing-scanner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZXingScannerComponent implements AfterViewInit, OnDestroy, OnChanges {
  /**
   * The ZXing code reader.
   */
  private codeReader: BrowserQRCodeReader = new BrowserQRCodeReader(1500);

  /**
   * Says if some native API is supported.
   */
  private isMediaDevicesSuported: boolean;

  /**
   * Says if some native API is supported.
   */
  private isEnumerateDevicesSuported: boolean;

  /**
   * List of enable video-input devices.
   */
  private videoInputDevices: MediaDeviceInfo[];
  /**
   * The actual device used to scan things.
   */
  private videoInputDevice: MediaDeviceInfo;

  /**
   * Says if the user allowedthe use of the camera or not.
   */
  private hasPermission: boolean;

  /**
   * Reference to the preview element, should be the `video` tag.
   */
  @ViewChild('preview') previewElemRef: ElementRef;

  /**
   * The scan throttling (time between scans) in milliseconds.
   */
  @Input() scanThrottling = 1500;

  /**
   * Allow start scan or not.
   */
  @Input() scannerEnabled = true;

  /**
   * The device that should be used to scan things.
   */
  @Input() device: MediaDeviceInfo;

  /**
   * The value of the HTML video's class attribute.
   */
  @Input() cssClass: string;

  /**
   * Enable or disable autofocus of the camera (might have an impact on performance)
   */
  @Input() autofocusEnabled = true;

  /**
   * Emitts events when a scan is successful performed, will inject the string value of the QR-code to the callback.
   */
  @Output() scanSuccess = new EventEmitter<string>();

  /**
   * Emitts events when a scan fails without errors, usefull to know how much scan tries where made.
   */
  @Output() scanFailure = new EventEmitter<void>();

  /**
   * Emitts events when a scan throws some error, will inject the error to the callback.
   */
  @Output() scanError = new EventEmitter<Error>();

  /**
   * Emitts events when a scan is performed, will inject the Result value of the QR-code scan (if available) to the callback.
   */
  @Output() scanComplete = new EventEmitter<Result>();

  /**
   * Emitts events when no cameras are found, will inject an exception (if available) to the callback.
   */
  @Output() camerasFound = new EventEmitter<MediaDeviceInfo[]>();

  /**
   * Emitts events when no cameras are found, will inject an exception (if available) to the callback.
   */
  @Output() camerasNotFound = new EventEmitter<any>();

  /**
   * Emitts events when the users answers for permission.
   */
  @Output() permissionResponse = new EventEmitter<boolean>();

  /**
   * Constructor to build the object and do some DI.
   */
  constructor() {
    this.isMediaDevicesSuported = !!(navigator && navigator.mediaDevices);
    this.isEnumerateDevicesSuported = !!(
      this.isMediaDevicesSuported && navigator.mediaDevices.enumerateDevices
    );
  } //constructor

  /**
   * Manages the bindinded property changes.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.scannerEnabled) {
      if (!this.scannerEnabled) {
        this.resetScan();
      } else if (this.videoInputDevice) {
        this.scan(this.videoInputDevice.deviceId);
      }
    }

    if (changes.device) {
      if (this.device) {
        this.changeDevice(this.device);
      } else {
        console.warn('zxing-scanner', 'device', 'Unselected device.');
        this.resetScan();
      }
    }

    if (changes.scanThrottling) {
      this.setCodeReaderThrottling(this.scanThrottling);
    }
  } //ngOnChanges

  /**
   * Executed after the view initialization.
   */
  ngAfterViewInit(): void {
    // Chrome 63 fix
    if (!this.previewElemRef) {
      console.warn('zxing-scanner', 'Preview element not found!');
      return;
    }

    // iOS 11 Fix
    this.previewElemRef.nativeElement.setAttribute('autoplay', false);
    this.previewElemRef.nativeElement.setAttribute('muted', true);
    this.previewElemRef.nativeElement.setAttribute('playsinline', true);
    this.previewElemRef.nativeElement.setAttribute('autofocus', this.autofocusEnabled);

    this.askForPermission().subscribe((hasPermission: boolean) => {
      if (hasPermission) {
        // gets and enumerates all video devices
        this.enumarateVideoDevices((videoInputDevices: MediaDeviceInfo[]) => {
          if (videoInputDevices && videoInputDevices.length > 0) {
            this.camerasFound.next(videoInputDevices);
          } else {
            this.camerasNotFound.next();
          }
        });

        this.startScan(this.videoInputDevice);
      } else {
        console.warn('User has denied permission.');
      }
    });
  } //ngAfterViewInit

  /**
   * Executes some actions before destroy the component.
   */
  ngOnDestroy(): void {
    this.resetScan();
  } //ngOnDestroy

  /**
   * Starts a new QR-scanner to set a new scan throttling.
   *
   * @param throttling The scan speed in milliseconds.
   */
  setCodeReaderThrottling(throttling: number): void {
    this.codeReader = new BrowserQRCodeReader(throttling);
  } //setCodeReaderThrottling

  /**
   * Properly changes the actual target device.
   *
   * @param device
   */
  changeDevice(device: MediaDeviceInfo): void {
    this.videoInputDevice = device;
    this.startScan(device);
  } //changeDevice

  /**
   * Properly changes the actual target device using it's deviceId.
   *
   * @param deviceId
   */
  changeDeviceById(deviceId: string): void {
    this.changeDevice(this.getDeviceById(deviceId));
  } //changeDeviceById

  /**
   * Properly returns the target device using it's deviceId.
   *
   * @param deviceId
   */
  getDeviceById(deviceId: string): MediaDeviceInfo {
    return this.videoInputDevices.find(device => device.deviceId === deviceId);
  } //getDeviceById

  /**
   * Gets and registers all cammeras.
   */
  askForPermission(): EventEmitter<boolean> {
    if (!this.isMediaDevicesSuported) {
      console.error(
        'zxing-scanner',
        'askForPermission',
        "Can't get user media, this is not supported."
      );
      return;
    }

    // Will try to ask for permission
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream: MediaStream) => {
        try {
          // Start stream so Browser can display permission-dialog ("Website wants to access your camera, allow?")
          this.previewElemRef.nativeElement.srcObject = stream;

          // After permission was granted, we can stop it again
          stream.getVideoTracks().forEach(track => {
            track.stop();
          });

          this.previewElemRef.nativeElement.srcObject = undefined;

          // if the scripts lives until here, that's only one mean:

          // permission granted
          this.hasPermission = true;

          this.permissionResponse.next(this.hasPermission);
        } catch (err) {
          console.error('zxing-scanner', 'askForPermission', err);

          // permission aborted
          this.hasPermission = undefined;

          this.permissionResponse.next(undefined);
        }
      })
      .catch((err: DOMException) => {
        // failed to grant permission to video input

        console.warn('zxing-scanner', 'askForPermission', err);

        switch (err.name) {
          case 'NotAllowedError':
            // permission denied
            this.hasPermission = false;

            this.permissionResponse.next(this.hasPermission);
            break;

          case 'NotFoundError':
            this.camerasNotFound.next(err);
            break;

          default:
            this.permissionResponse.next(undefined);
            break;
        }
      });

    // Returns the event emitter, so thedev can subscribe to it
    return this.permissionResponse;
  } //askForPermission

  /**
   * Starts the continuous scanning for the given device.
   *
   * @param deviceId The deviceId from the device.
   */
  scan(deviceId: string): void {
    try {
      this.codeReader.decodeFromInputVideoDevice(
        (result: any) => {
          console.debug('zxing-scanner', 'scan', 'result: ', result);

          if (result) {
            this.dispatchScanSuccess(result);
          } else {
            this.dispatchScanFailure();
          }

          this.dispatchScanComplete(result);
        },
        deviceId,
        this.previewElemRef.nativeElement
      );
    } catch (err) {
      this.dispatchScanError(err);
      this.dispatchScanComplete(undefined);
    }
  } //scan

  /**
   * Starts the scanning if allowed.
   *
   * @param device The device to be used in the scan.
   */
  startScan(device: MediaDeviceInfo): void {
    if (this.scannerEnabled && device) {
      this.scan(device.deviceId);
    }
  } //startScan

  /**
   * Stops the scan service.
   */
  resetScan(): void {
    this.codeReader.reset();
  } //resetScan

  /**
   * Dispatches the scan success event.
   *
   * @param result the scan result.
   */
  private dispatchScanSuccess(result: Result): void {
    this.scanSuccess.next(result.getText());
  } //dispatchScanSuccess

  /**
   * Dispatches the scan failure event.
   */
  private dispatchScanFailure(): void {
    this.scanFailure.next();
  } //dispatchScanFailure

  /**
   * Dispatches the scan error event.
   *
   * @param err the error thing.
   */
  private dispatchScanError(error: any): void {
    this.scanError.next(error);
  } //dispatchScanError

  /**
   * Dispatches the scan event.
   *
   * @param result the scan result.
   */
  private dispatchScanComplete(result: Result): void {
    this.scanComplete.next(result);
  } //dispatchScanComplete

  /**
   * Enumerates all the available devices.
   *
   * @param successCallback
   */
  enumarateVideoDevices(successCallback: any): void {
    if (!this.isEnumerateDevicesSuported) {
      console.error(
        'zxing-scanner',
        'enumarateVideoDevices',
        "Can't enumerate devices, method not supported."
      );
      return;
    }

    navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
      this.videoInputDevices = [];

      for (const deviceI of devices) {
        // @todo type this as `MediaDeviceInfo`
        const device: any = {};

        // tslint:disable-next-line:forin
        for (const key in deviceI) {
          device[key] = deviceI[key];
        }

        if (device.kind === 'video') {
          device.kind = 'videoinput';
        }

        if (!device.deviceId) {
          device.deviceId = (<any>device).id;
        }

        if (!device.label) {
          device.label = 'Camera (no-permission)';
        }

        if (device.kind === 'videoinput') {
          this.videoInputDevices.push(device);
        }
      }

      successCallback(this.videoInputDevices);
    });
  } //enumarateVideoDevices
}
