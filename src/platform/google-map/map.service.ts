import { Injectable, NgZone, OnInit } from '@angular/core';
import {} from '@types/googlemaps';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators/map';

import { MapConfig, LatLng, MapOptions, LatLngInterface } from './models';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class MapService {
  map: any;
  polygon: any;
  marker: any;
  path: Array<any> = [];
  pointer: any;
  pointers: Array<any> = [];
  doneButton :HTMLElement;

  constructor(private zone: NgZone, private mapConf: MapConfig) {
    this.path = [];
  }
  s: Subscription;

  // init google map
  initMap(mapElement: HTMLElement, options: MapOptions) {
    this.s = this.init()
      .pipe(
        map(
          () => (this.mapCreate(mapElement,options))
        )
      )
      .subscribe(res => this.s.unsubscribe());
  } // initMap()

  init(): Observable<Object> {
    return Observable.create((observer: Observer<Object>) => {
      let d = document,
        gMap,
        ref: any = d.getElementsByTagName('script')[0];
      gMap = d.createElement('script');
      gMap.async = true;
      gMap.src = 'http://maps.googleapis.com/maps/api/js?key=' + this.mapConf.apiKey;

      gMap.onload = function() {
        observer.next({});
        observer.complete();
      };
      ref.parentNode.insertBefore(gMap, ref);
    });
  } // ngOnInit()

  /**
   * @method mapPolygon
   * @param polygon
   * @param map
   * @author Rumes
   */
  mapPolygon(polygon: boolean, map?: any) {
    if (polygon) {
      this.s.unsubscribe();

      if (this.pointer) {
        this.clearMap(this.pointers)
        this.path = [];
      }

      this.polygon = new google.maps.Polygon({
        paths: this.path,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFFF00',
        fillOpacity: 0.35
      });

      this.polygon.setMap(map);

      this.s = this.subscribeToMapEvent<{ latLng: LatLngInterface }>('click').subscribe(
        (event: { latLng: LatLngInterface }) => {
          this.path.push(event.latLng);
          this.polygon.setPaths(this.path);
        }
      );
    }
  } // mapPolygon()

  mapMarker(pointer: boolean, map?: any) {
    if (pointer) {
      this.s.unsubscribe();
      this.path = [];

      if (this.polygon) {
        this.polygon.setMap(null);
      }

      this.s = this.subscribeToMapEvent<{ latLng: LatLngInterface }>('click').subscribe(
        (event: { latLng: LatLngInterface }) => {
          this.marker = event.latLng;

          this.pointer = new google.maps.Marker({
            position: this.marker
          });
          this.pointers.push(this.pointer);
          this.path.push(event.latLng);

          this.pointer.setMap(map);
        }
      );
    }
  } // mapMarker
  /**
   * @method subscribeToEvent
   * @param eventName
   * @returns Observable
   * @author Rumes
   */
  subscribeToMapEvent<E>(eventName: string): Observable<E> {
    return Observable.create((observer: Observer<E>) => {
      this.map.addListener(eventName, (arg: E) => {
        this.zone.run(() => observer.next(arg));
      });
    });
  }

  mapReturn(): Array<LatLngInterface> {
    if (this.path.length <= 2) {
      return;
    }

    let points: any[] = [];
    this.path.forEach(location => {
      points.push({ lat: location.lat(), lng: location.lng() });
    });

    return points;
  }

  clearMap(array:Array<any>){
    array.forEach((element) => {
      element.setMap(null);
    });

  }

  mapCreate(mapElement:HTMLElement,options : MapOptions){
    this.map = new google.maps.Map(mapElement, {
      zoom: options.zoom,
      center: options.center,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      //linksControl: this.mapConf.linksControl,
      panControl: this.mapConf.panControl,
      //enableCloseButton: this.mapConf.enableCloseButton,
      mapTypeControl: this.mapConf.mapTypeControl,
      heading: this.mapConf.heading,
      tilt: this.mapConf.tilt
    });

    if(options.markers.length > 0){
      options.markers.forEach((element:LatLng) => {
        this.createMarker(element,this.map);
      });
    }
    //  this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.doneButton);
  }

  createMarker(latlang:LatLng, map:any){

    this.marker = new google.maps.LatLng(latlang.lat,latlang.lng);
    this.pointer = new google.maps.Marker({
      position: this.marker,
      icon: "http://maps.gstatic.com/mapfiles/markers2/icon_green.png" 
    });
    this.pointer.setMap(map);
  }
} // End class GoogleMapService
