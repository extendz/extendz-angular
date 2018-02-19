import { LatLng } from "./index";

export class MapPolygon{
    paths:Array<LatLng>;
    strokeColor:string = '#FF0000';
    strokeOpacity: number = 0.8;
    strokeWeight: number = 2;
    fillColor: string = '#FFFF00';
    fillOpacity: number = 0.35;
}