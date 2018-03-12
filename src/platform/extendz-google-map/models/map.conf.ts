import { LatLng } from "./index";
import { MapToolType } from "../enums/index";

export class MapConfig {
    apiKey : string;
    center ?: LatLng;
    zoom ?: number;
    mapElement ?: HTMLElement;
    tools?:Array<MapToolType>;
    linksControl?:boolean = false;
    panControl?: boolean = false;
    enableCloseButton?: boolean =false;
    mapTypeControl?: boolean =false;
    heading?: number = 90;
    tilt?: number = 45;
}