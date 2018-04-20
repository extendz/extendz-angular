/**
 *    Copyright 2018 the original author or authors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { ExtendzOpenlayerService } from './extendz-openlayer.service';

import { TiffImage, OlOptions, ToolOption, Tool } from './models';

import { OpenLayerToolType, PointToolType, PolygonToolType } from './utils';
import { LatLng } from './models';

@Component({
  selector: 'ext-openlayer',
  templateUrl: './extendz-openlayer.component.html',
  styleUrls: ['./extendz-openlayer.component.css']
})
export class ExtedzOpenlayerComponent implements OnInit {
  @Input('polygontyps') polygontyps: Array<Tool>;
  @Input('pointstyps') pointstyps: Array<Tool>;
  @Input('image') tiffImage: TiffImage;
  @Input('drawtype') drawType: OpenLayerToolType;
  @Input('tooltype') tooltype: string;
  @Input('points') points: Array<LatLng>;
  @Input('drawcolor') drawcolor: string;
  @Output() onDraw = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<boolean>();

  featureCoordinats: any;
  OpenLayerToolType = OpenLayerToolType;
  pointToolType = PointToolType;
  polygonToolType = PolygonToolType;

  olOptions: OlOptions;

  featureDeleted: boolean = false;

  public currentToolType: OpenLayerToolType;

  constructor(public service: ExtendzOpenlayerService) {
    // console.log(this.service.featureDeleted);
    this.featureDeleted = this.service.featureDeleted;
  }

  ngOnInit() {
    this.tiffImage = this.tiffImage
      ? this.tiffImage
      : { jobId: null, imageUrl: null, extent: [0, 0, 0, 0] };
    this.drawType = this.drawType;
    this.tooltype = this.tooltype ? this.tooltype : null;
    this.points = this.points ? this.points : [];
    this.polygontyps = this.polygontyps ? this.polygontyps : [];
    this.pointstyps = this.pointstyps ? this.pointstyps : [];
    this.drawcolor = this.drawcolor ? this.drawcolor : 'rgba(0,0,255,0.5)';

    this.olOptions = {
      tiffImage: this.tiffImage,
      drawEmmiter: this.onDraw,
      deleteEmmiter: this.onDelete,
      drawType: this.drawType,
      tooltype: this.tooltype,
      points: this.points,
      color: this.drawcolor
    };
    console.log(this.olOptions);

    this.service.initMap(this.olOptions);
  }

  setTool(event: any, toolType?: any) {
    this.featureCoordinats = this.service.setTool(
      this.currentToolType,
      event.value.name,
      event.value.color
    );
    this.onDraw.emit(this.featureCoordinats);
  }

  setToolType(tool: OpenLayerToolType) {
    this.currentToolType = tool;
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      // case '9':
      //   this.service.updatePointTool(PointToolType.CAR);
      //   break;
      // case '0':
      //   this.service.updatePointTool(PointToolType.PRODUCTION_CAR);
      //   break;
      // case '1':
      //   this.service.updatePolygonTool(PolygonToolType.CONCENTRATES);
      //   break;
      // case '2':
      //   this.service.updatePolygonTool(PolygonToolType.STOCK);
      //   break;
      // case 'g':
      //   this.onCloseClick();
      //   break;
      case 'e':
        this.service.toogleSelectMode();
        break;
      case 'b':
        break;
      case 'z':
        if (event.ctrlKey) {
          this.service.undo();
        } else this.service.finishDraw();
        break;
      case ' ': // space
        break;
    }
  } // End onKeyUp()
  selectMode() {
    this.service.toogleSelectMode();
  }
  undoDelete() {
    this.service.undoDelete();
    this.featureDeleted = false;
  }

  /* Detect property change in this class.
  * @param changes 
  */
  ngOnChanges(changes: SimpleChanges) {
    this.olOptions = {
      tiffImage: changes['tiffImage']
        ? (this.tiffImage = changes['tiffImage'].currentValue)
        : this.tiffImage,
      drawEmmiter: this.onDraw,
      deleteEmmiter: this.onDelete,
      drawType: this.drawType,
      tooltype: this.tooltype,
      points: this.points,
      color: this.drawcolor
    };

    if (changes['tiffImage']) {
      this.service.onChangeImage(changes, this.olOptions);
    }
  } // ngOnChanges()
}
