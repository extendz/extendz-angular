import { MapToolType } from '../enums/map-tool';
import { LatLng } from './index';

export class MapOptions {
    center: LatLng;
    zoom: number;
    markers?:Array<LatLng>; 
}