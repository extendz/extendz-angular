import { Component, OnInit } from '@angular/core';
import { LatLng } from '../../../../platform/extendz-google-map';

@Component({
  selector: 'app-mapexample',
  templateUrl: './mapexample.component.html',
  styleUrls: ['./mapexample.component.css']
})
export class MapexampleComponent implements OnInit {
  latLng : LatLng = {
    lat:12.3211,
    lng:23.1234
  }

  markers : Array<LatLng> = [{lat:34.34,lng:23.34}, this.latLng]
  constructor() { }

  ngOnInit() {
  }

}
