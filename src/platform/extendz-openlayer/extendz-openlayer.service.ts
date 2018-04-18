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

import { Injectable, NgZone, EventEmitter } from '@angular/core';
import {} from '@types/openlayers';
import * as ol from 'openlayers';
import { TiffImage, OlOptions, LatLng, ReturnObject } from './models/index';
import {
  OpenLayerToolType,
  PointToolType,
  PointTool,
  PolygonTool,
  PolygonToolType
} from './utils/index';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { element } from 'protractor';

@Injectable()
export class ExtendzOpenlayerService {
  constructor(private zone: NgZone) {
    this.haveFeature = false;
    this.featureDeleted = false;
    this.returnCollection = [];
  }

  /**
   * Native Html elemet that holds the map
   */
  public mapElement: HTMLElement;
  /**
   * Emit drawn shape object to parent component
   */
  public onDraw: EventEmitter<any>;

  /**
   * Emit delete shape object to parent component
   */
  private onDelete: EventEmitter<any>;

  /**
   * shape drawing start time
   */
  private shapeDrawStartTime: Date;

  /**
   * shape drawing end time
   */
  private shapeDrawEndTime: Date;

  /**
   * Object that hold customized POLYGON DRAW Interaction, source, vector,style
   */
  public polygonObject: any;
  /**
   * hold the current jobId
   */
  public jobID: number;
  /**
   * Hold the details of drawn shape.
   */
  public returnCoordinate: ReturnObject;
  /**
   * emit object on shped drawn or delete. array of ReturnObject.
   */
  private returnCollection: Array<ReturnObject>;

  /**
   * Object that hold customized POINT DRAW Interaction, source, vector,style
   */
  public pointObject: any;

  /**
   * determine wether feature is exist
   */
  public haveFeature: boolean;
  /**
   * determine wether feature is deleted
   */
  public featureDeleted: boolean;
  /**
   * hold deleted feature
   */
  public removedFeature: ol.Feature;
  /**
   * hold deleted feature style
   */
  public removedFeatureStyle: any;
  /**
   * hold active feature
   */
  private currentFeatures: ol.Collection<ol.Feature>;

  private consantrationFeatures: ol.Collection<ol.Feature>;

  /**
   * Images bounding location
   */
  public extent: any;

  public vectorSource: any;

  public vectorLayer: ol.layer.Vector;

  public feature: ol.Feature;
  public featurs: Array<ol.Feature>;
  public polygonFeaturs: Array<ol.Feature> = [];
  public pointFeaturs: Array<ol.Feature> = [];

  public singleCoordinats: ol.Coordinate;
  public coordinats: Array<ol.Coordinate> = [];
  /**
   *
   */
  public source: any;

  public drawStarted: boolean;

  /**
   * Projection for the image. Since we use lat,lng we use EPSG:4326. Also we show a png image so the units will be pixels
   */
  public projection: ol.proj.Projection; /**
   * Layer to handle static Image
   */
  public imageLayer: ol.layer.Image;

  private drawType: OpenLayerToolType;

  /**
   * All map interactions
   */
  private interactions: ol.Collection<ol.interaction.Interaction> = new ol.Collection<
    ol.interaction.Interaction
  >();

  private selectionInteraction: ol.interaction.Select;
  /**
   * Hold the map object
   */
  public map: ol.Map;

  /**
   * Drap and pan interaction.
   * Activated only with middle mouse button.
   */
  private dragPanInteraction: ol.interaction.DragPan = new ol.interaction.DragPan({
    condition: (event: ol.MapBrowserEvent) => {
      var originalEvent: any = event.originalEvent;
      if (originalEvent.button == 1) return true;
      return false;
    }
  });

  /**
   * Mouse Wheel zoom interaction.
   */
  private mouseWheelZoomInteraction: ol.interaction.MouseWheelZoom = new ol.interaction.MouseWheelZoom();

  // current draw in use
  public currentDraw: ol.interaction.Draw;
  /**
   * @method : initMap
   * @author : Rumes
   * @param olOption
   * @returns void
   * @description get the png image and extent and show it in the canves.
   */
  initMap(olOption: OlOptions) {
    // set initial extent
    if (olOption.tiffImage.extent) {
      this.extent = olOption.tiffImage.extent;
    }

    //initial projection
    this.projection = new ol.proj.Projection({
      code: 'EPSG:4326',
      units: 'pixels',
      extent: this.extent
    });

    // initial source
    this.source = new ol.source.ImageStatic({
      url: olOption.tiffImage.imageUrl,
      imageExtent: this.extent,
      projection: this.projection
    });

    // initial image layer
    this.imageLayer = new ol.layer.Image({
      source: this.source
    });

    // initial interaction
    this.interactions.push(this.dragPanInteraction);
    this.interactions.push(this.mouseWheelZoomInteraction);

    // initiate map
    this.map = new ol.Map({
      interactions: this.interactions,
      target: 'openlayer',
      layers: [this.imageLayer],
      renderer: 'canvas',
      view: new ol.View({
        projection: this.projection,
        center: ol.extent.getCenter(this.extent),
        zoom: 2,
        maxZoom: 8
      })
    });
    this.jobID = olOption.tiffImage.jobId;
    this.onDraw = olOption.drawEmmiter;
    this.onDelete = olOption.deleteEmmiter;

    if (olOption.drawType == 0 || olOption.drawType == 1) {
      this.setToolExist(olOption.drawType, olOption.tooltype, olOption.points, olOption.color);
    }
  } // initMap()ointToolType

  /**
   * @method setTool
   * @author Rumes
   * @param tool
   * @param color
   * @param toolTypemarc antoni gretest hits
   * @description manage the tool type
   */
  setTool(tool: OpenLayerToolType, toolType?: string, color?: string) {
    this.preSetTool();
    switch (tool) {
      case OpenLayerToolType.POINT:
        this.drawType = OpenLayerToolType.POINT;
        this.updatePointTool(toolType, color);
        if (this.pointFeaturs) {
          this.addExistingFeaturs(this.pointFeaturs);
        }
        if (this.polygonFeaturs) {
          this.polygonFeaturs = [];
        }

        break;
      case OpenLayerToolType.POLYGON:
        this.drawType = OpenLayerToolType.POLYGON;
        this.updatePolygonTool(toolType, color);
        if (this.polygonFeaturs) {
          this.addExistingFeaturs(this.polygonFeaturs);
        }
        if (this.pointFeaturs) {
          this.pointFeaturs = [];
        }
        break;
    }
  } // End setTool()

  /**
   *
   * @param tool
   * @param toolType
   * @param points
   * @param color
   * @author Rumes
   * @description manage existin coordinates according to Draw Type
   */
  setToolExist(tool: OpenLayerToolType, toolType: string, points: Array<LatLng>, color: string) {
    this.preSetTool();
    switch (tool) {
      case OpenLayerToolType.POINT:
        this.drawType = OpenLayerToolType.POINT;
        this.updatePointToolFromExist(toolType, points, color);
        break;
      case OpenLayerToolType.POLYGON:
        this.drawType = OpenLayerToolType.POLYGON;
        this.updatePolygonToolFromExist(toolType, points, color);
        break;
    }
  }

  /**
   * Before changing the tool clean up the old one.
   */
  preSetTool() {
    if (this.currentDraw) {
      this.map.removeInteraction(this.currentDraw);
    }
    if (this.selectionInteraction) {
      this.map.removeInteraction(this.selectionInteraction);
    }
    if (this.currentFeatures) {
      this.currentFeatures.clear();
    }

    if (this.vectorSource) {
      this.vectorSource.clear();
    }
    if (this.returnCollection) {
      this.returnCollection = [];
    }
  } // End preSetTool

  /**
   * @method updatePointTool
   * @author Rumes
   * @param toolType
   * @param color
   * @description get the point tool type and according to them
   * customize POINT interaction & assing to current Draw
   */
  updatePointTool(toolType: string, color: string) {
    var pointTool = new PointTool();

    this.pointObject = pointTool.creatNewDraw(color);
    this.currentDraw = this.pointObject.draw;
    this.vectorSource = this.pointObject.source;
    this.vectorLayer = pointTool.vector;
    this.createPoints(toolType);
    this.haveFeature = true;
    this.map.addInteraction(this.currentDraw);
    this.map.addLayer(this.vectorLayer);
  }

  /**
   * @method updatePoygonTool
   * @author Rumes
   * @param toolType
   * @param color
   * @description get the polygon tool type and according to them
   * customize POLYGON interaction & assing to current Draw
   */
  updatePolygonTool(toolType: string, color: string) {
    var polygonTool = new PolygonTool();

    this.polygonObject = polygonTool.createNewDraw(color);
    this.postSetTool(toolType);
  } // End updatePoygonTool()

  postSetTool(toolType: string) {
    if (this.polygonObject) {
      this.currentDraw = this.polygonObject.draw;
      this.map.addInteraction(this.currentDraw);
    }

    this.vectorSource = new ol.source.Vector({ features: this.currentFeatures });
    this.vectorLayer = new ol.layer.Vector({ source: this.vectorSource });
    this.map.addLayer(this.vectorLayer);

    this.createPolygon(toolType);
  }

  /**
   * @author Rumes
   * @description create polygon using draw interaction
   */
  createPolygon(toolType: string) {
    this.subcribeToCurrentDrawEvent<{}>('drawstart').subscribe(
      (event: ol.interaction.Draw.Event) => {
        this.shapeDrawStartTime = new Date();
        this.drawStarted = true;
      }
    );

    this.subcribeToSourceEvent('addfeature').subscribe((event: ol.interaction.Draw.Event) => {
      event.feature.setProperties({
        toolType: toolType
      });

      this.shapeDrawEndTime = new Date();

      let geom = event.feature;
      let cordinates: ol.Coordinate[][];
      let latlngArray: Array<LatLng>;
      this.returnCoordinate = this.getCoordinatsFromGeometry(geom, toolType);
      if (this.returnCoordinate.coordiantes.length <= 3) {
        console.log('Area not selected', null, {
          duration: 2000
        });
        return;
      }

      this.onDraw.emit(this.returnCoordinate);
      const feature = new ol.Feature(geom.getGeometry());
      feature.setProperties({
        toolType: toolType
      });
      feature.setStyle(this.polygonObject.style);
      this.polygonFeaturs.push(feature);
      this.vectorSource.addFeature(feature);
      this.haveFeature = true;
    });
  }

  /**
   * @author Rumes
   * @author Randika Hapugoda
   * @description create point using draw interaction
   */
  createPoints(toolType: string) {
    this.subcribeToCurrentDrawEvent<{}>('drawstart').subscribe(
      (event: ol.interaction.Draw.Event) => {
        event.feature.setProperties({
          toolType: toolType
        });
        let geom = event.feature.getGeometry();
        this.drawStarted = true;
      }
    ); // createPoints()

    this.subcribeToCurrentDrawEvent<{}>('drawend').subscribe((event: ol.interaction.Draw.Event) => {
      event.feature.setProperties({
        toolType: toolType
      });
      let geom = event.feature;
      geom.setStyle(this.pointObject.style);
      this.pointFeaturs.push(geom);
      this.returnCoordinate = this.getCoordinatsFromGeometry(geom, toolType);
      this.returnCollection.push(this.returnCoordinate);
      this.onDraw.emit(this.returnCoordinate);
      this.drawStarted = false;
    });
  }

  finishDraw() {
    this.currentDraw.finishDrawing();
  } // End finishDraw()

  undo() {
    if (this.currentDraw) {
      this.currentDraw.removeLastPoint();
    }
  } // end undo()

  /**
   *
   * @param toolType
   * @param points
   * @author Rumes
   * @description manage existing points according to Point Tool Type
   *
   */
  updatePointToolFromExist(toolType: string, points: Array<LatLng>, color: string) {
    var pointTool = new PointTool();
    console.log(color);

    this.pointObject = pointTool.creatNewDraw(color);
    this.createFeatureVector(points, 'point', this.pointObject.style);
    this.map.addLayer(this.vectorLayer);
  }

  /**
   *
   * @param toolType
   * @param points
   * @author Rumes
   * @description manage existing polygon according to Polygon Tool Type
   *
   */
  updatePolygonToolFromExist(toolType: string, points: Array<LatLng>, color: string) {
    var polygonTool = new PolygonTool();
    console.log(color);

    this.polygonObject = polygonTool.createNewDraw(color);
    this.currentFeatures = this.consantrationFeatures;
    this.currentDraw = this.polygonObject.draw;
    this.createFeatureVector(points, 'polygon', this.polygonObject.style);
    this.map.addLayer(this.vectorLayer);
  }
  /**
   *
   * @param points
   * @param type
   * @param style
   * @author Rumes
   * @description create vector using existing lat lang coordinates
   */
  createFeatureVector(points: Array<LatLng>, type: string, style?: ol.style.Style) {
    this.latLangtoCoordinate(points);
    this.featurs = [];
    if (this.coordinats) {
      if (type == 'point') {
        this.coordinats.forEach(element => {
          this.feature = new ol.Feature({
            geometry: new ol.geom.Point(element)
          });

          this.featurs.push(this.feature);
        });
      } else if (type == 'polygon') {
        this.feature = new ol.Feature({
          geometry: new ol.geom.Polygon([this.coordinats])
        });
        this.featurs.push(this.feature);
      }
      this.vectorSource = new ol.source.Vector({
        features: this.featurs
      });
      this.vectorLayer = new ol.layer.Vector({
        source: this.vectorSource,
        style: style
      });
    } else {
      this.vectorLayer = null;
    }
  }

  /**
   *
   * @param points
   * @author Rumes
   * @description Convert LatLang Array in to cordinates array
   */
  latLangtoCoordinate(points: Array<LatLng>) {
    if (points.length > 0) {
      points.forEach(element => {
        this.singleCoordinats = null;
        this.singleCoordinats = [element.lat, element.lng];
        this.coordinats.push(this.singleCoordinats);
      });
    } else {
      this.coordinats = null;
    }
  }

  toogleSelectMode() {
    let active = this.currentDraw.getActive();
    if (active) {
      this.map.removeInteraction(this.currentDraw);
      this.selectionInteraction = new ol.interaction.Select({});

      this.subcribeToSelectEvent('select').subscribe((e: ol.interaction.Select.Event) => {
        if (e.selected.length > 0) {
          let featureId = e.selected[0];
          this.deleteFeature(featureId);

          // this.polygonObject.source.removeFeature(this.polygonObject.source.getFeatureById());
          this.removedFeatureStyle = e.selected[0].getStyle();
          e.selected[0].setStyle(null);
        }
      });
      this.map.addInteraction(this.selectionInteraction);
    } else {
      this.map.removeInteraction(this.selectionInteraction);
      this.map.addInteraction(this.currentDraw);
    }
  } // End toogleSelectMode()

  /**
   *
   * @param feature
   * @author Rumes
   * @description Remove the passed Feature from the Vector Source
   */
  deleteFeature(feature: ol.Feature) {
    this.vectorSource.removeFeature(feature);
    this.removedFeature = feature;
    this.returnCoordinate = this.getCoordinatsFromGeometry(this.removedFeature);
    this.checkInFeaturesArray(this.removedFeature);
    this.onDelete.emit(this.returnCoordinate);
    this.featureDeleted = true;
  }

  /**
   * Subscribe to draw current draw event.
   *
   * @author Randika Hapugoda
   * @param eventName
   */
  subcribeToCurrentDrawEvent<E>(eventName: string): Observable<ol.interaction.Draw.Event> {
    return Observable.create((observer: Observer<ol.interaction.Draw.Event>) => {
      this.currentDraw.on(eventName, (arg: ol.interaction.Draw.Event) => {
        this.zone.run(() => observer.next(arg));
      });
    });
  } // subcribeToCurrentDrawEvent()

  subcribeToSourceEvent<E>(eventName: string): Observable<E> {
    return Observable.create((observer: Observer<E>) => {
      this.polygonObject.source.on(eventName, (arg: E) => {
        this.zone.run(() => observer.next(arg));
      });
    });
  } // subcribeToSourceEvent ()

  subcribeToViewPortEvent<E>(eventName: string): Observable<E> {
    return Observable.create((observer: Observer<E>) => {
      this.map.getViewport().addEventListener(eventName, (evt: any) => {
        // Prevent contect menu
        event.preventDefault();
        this.finishDraw();
        // let originalEvent: any = event.originalEvent;
      });
    });
  } // subcribeToViewPortEvent ()

  subcribeToSelectEvent<E>(eventName: string): Observable<ol.interaction.Select.Event> {
    return Observable.create((observer: Observer<ol.interaction.Select.Event>) => {
      this.selectionInteraction.on(eventName, (arg: ol.interaction.Select.Event) => {
        this.zone.run(() => observer.next(arg));
      });
    });
  } // subcribeToSelectEvent()

  /**
   * @author Rumes
   * @description Reset last deleted feature
   */
  undoDelete() {
    this.map.removeInteraction(this.selectionInteraction);
    this.removedFeature.setStyle(this.removedFeatureStyle);
    this.vectorSource.addFeature(this.removedFeature);
    let geom = this.removedFeature;
    this.returnCoordinate = this.getCoordinatsFromGeometry(geom);
    this.onDraw.emit(this.returnCoordinate);
    this.featureDeleted = false;
  }
  /**
   *
   * @param cordinates
   * @returns Array of LatLng objects
   * @author Rumes
   * @description get array of cordinates and convert to Array of LatLng Objects
   */
  coordinatsToLatLng(cordinates: ol.Coordinate[]): Array<LatLng> {
    let returnLatlng = Array<LatLng>();
    cordinates.forEach(element => {
      returnLatlng.push({
        lat: element[0],
        lng: element[1]
      });
    });
    return returnLatlng;
  }

  /**
   *
   * @param geom
   * @param drawTool
   * @author Rumes
   * @description get the feature geomatry and return ReturnObject
   */
  getCoordinatsFromGeometry(removedFeature: ol.Feature, drawTool?: string): ReturnObject {
    let geom = removedFeature.getGeometry();
    let cordinates: ol.Coordinate[][];
    let cordinate: ol.Coordinate;
    let latlngArray: Array<LatLng>;
    let drawToolIn: string = removedFeature.getProperties().toolType
      ? removedFeature.getProperties().toolType
      : '';
    console.log(drawToolIn);

    if (geom instanceof ol.geom.Point) {
      cordinate = geom.getCoordinates();
      this.returnCoordinate = {
        jobId: this.jobID,
        coordiantes: [
          {
            lat: cordinate[0],
            lng: cordinate[1]
          }
        ],
        drawType: 'POINT',
        drawTool: drawToolIn,
        duration: 1
      };
    }
    if (geom instanceof ol.geom.Polygon) {
      cordinates = geom.getCoordinates();
      latlngArray = [];
      latlngArray = this.coordinatsToLatLng(cordinates[0]);
      this.returnCoordinate = {
        jobId: this.jobID,
        coordiantes: latlngArray,
        drawType: 'POLYGON',
        drawTool: drawToolIn,
        duration: 1
      };
      this.returnCollection.push();
    }

    return this.returnCoordinate;
  }

  addExistingFeaturs(features: Array<ol.Feature>) {
    if (features) {
      features.forEach(element => {
        console.log(element.getStyle());

        this.vectorSource.addFeature(element);
      });
    }
  }
  checkInFeaturesArray(feature: ol.Feature) {
    if (this.drawType == OpenLayerToolType.POINT) {
      this.pointFeaturs = this.pointFeaturs.filter(x => x.getGeometry() != feature.getGeometry());
    }
    if (this.drawType == OpenLayerToolType.POLYGON) {
      console.log(feature);

      this.polygonFeaturs = this.polygonFeaturs.filter(
        x => x.getGeometry() != feature.getGeometry()
      );
      console.log(this.polygonFeaturs);
    }
  }
}
