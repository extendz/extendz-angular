import { Component, OnInit } from '@angular/core';
import { TiffImage, LatLng, Tool, OpenLayerTool, OpenLayerToolType } from '../../../platform/extendz-openlayer';

@Component({
  selector: 'app-openlayer',
  templateUrl: './openlayer-example.component.html',
  styleUrls: ['./openlayer-example.component.css']
})
export class OpenlayerExampleComponent implements OnInit {
  tiffImage : TiffImage = {
    jobId:1,
    imageUrl:"assets/img/37.png",
    extent:[-76.51367693405734, 42.42886985890468, -76.51169990480923, 42.42984853959061]
  };

  polygon:Array<LatLng> = [
    {
      lat:-76.51267693405734,
      lng:42.42896985890468
    },
    {
      lat:-76.51277693405734,
      lng:42.42906985890468
    },
    {
      lat:-76.51277693405734,
      lng:42.42916985890468
    }

  ];

  openlayerTool = OpenLayerToolType;

  pointOptions : Array<Tool> = [
 
      {
        name : "Red Point",
        color: "rgba(204,0,0,0.5)"
      },
      {
        name : "Green Point",
        color: "rgba(95,156,55,0.5)"
      },

    ];

  polygonOptions : Array<Tool> =[
      {
        name : "Red Polygon",
        color: "rgba(204,0,0,0.5)"
      },
      {
        name : "Green Polygon",
        color: "rgba(95,156,55,0.5)"
      },
    ];

  constructor() {    
    
  }
 
  ngOnInit() {
  }
  onDraw(event){
    console.log(event);  
  }
}
