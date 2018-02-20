import {
  Component,
  OnInit,
  ViewChild,
  Output,
  Input,
  EventEmitter,
  ElementRef,
  HostListener
} from '@angular/core';

import { MapService } from './map.service';
import { LatLng, MapOptions, LatLngInterface } from './models';

@Component({
  selector: 'app-google-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') googleMap: ElementRef;
  @Input('zoom') zoom: number;
  @Input('center') center: LatLng;
  @Input('polygon') polygon: boolean;
  @Input('advance') advance: boolean;
  @Input('point') point: boolean;
  @Input('markers') markers: Array<LatLng>;
  @Output() onCrop = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<boolean>();

  constructor(public service: MapService) {}

  option: MapOptions;

  path: Array<any> = this.service.path;

  points: Array<LatLngInterface>;

  ngOnInit() {
    this.initMap();
  } //  ngOnInit()

  initMap(){
    this.option = {
      center: this.center ? this.center : {lat:0,lng:0},
      zoom: this.zoom ? this.zoom : 4,
      markers : this.markers ? this.markers : []
    };
    this.service.initMap(this.googleMap.nativeElement, this.option);
  }

  mapDone() {
    this.points = this.service.mapReturn();

    this.onCrop.emit(this.points);
  }
  // cropMap()

  cropChange(){
    this.polygon = !this.polygon;
    this.point = false;
    this.service.mapPolygon(this.polygon,this.service.map);
  }

  pointChange(){
    this.point = !this.point;
    this.polygon = false;
    this.service.mapMarker(this.point,this.service.map);
  }


  close() {
    this.onClose.emit(true);
  } // close()

  /**
   *
   * @param ev
   * @method onKeyUp
   */
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    switch (ev.key) {
      case 'z':
        if (ev.ctrlKey) {
          this.service.path.pop();
          if(this.polygon){
            this.service.polygon.setPaths(this.service.path);
          }else{
           
          }
          
        }
        break;

      case 'c':
        this.mapDone();
        break;
      case 'g':
        this.close();
        break;
    }
  } // End onKeyUp()
} //  class
