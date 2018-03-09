<!---
    Copyright 2018 the original author or authors
 
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
 
        http://www.apache.org/licenses/LICENSE-2.0
 
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
-->

# @extendz/extendz-openlayer

## demo

you can find example and demo [here](https://extendz.github.io/extendz-live/openlayer)

## per request

* angular 2,4,5
* nodejs 6 or above
* npm

## installation

`npm i @extendz/extendz-openlayer --save`

## usage

### mapexample.module.ts

```typescript
import { ExtendzOpenlayerModule } from ‘@extendz/extendz-openlayer’;

@NgModule({
	imports: [
		CommonModule,
		ExtendzOpenlayerModule
	],
})

export class MapexampleModule {}
```

### mapexample.component.html

```html
<div style="height: 90vh">
	<open-layer
	[image] = "tiffImage" <--- TiffImage Object ex: "{jobId:number, imageUrl:string, 													extent:Array<number>}"
	[drawtype] = "openlayerTool.POLYGON" <--- Open layer initial draw type
	[points] = "polygon" <----  Array of LatLng objects
	[polygontyps] = "polygonOptions" <--- Array of Tool objects  
	[pointstyps] = "pointOptions" <--- Array of Tool objects
	[drawcolor] = "'rgba(204,0,0,0.5)'" <--- color of initial points or polygon
	(onDraw) = "onDraw($event)" <---ondraw event emit drawn shape or point coodinats
	(onDelete) = "onDelete()" <--- ondelete event emit deleted shape or point 										coordinates
	></open-layer>
</div>
```

### openlayer-example.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import {
  TiffImage,
  LatLng,
  Tool,
  OpenLayerTool,
  OpenLayerToolType
} from '@extendz/extendz-openlayer';

@Component({
  selector: 'app-mapexample',
  templateUrl: './openlayer-example.component.html',
  styleUrls: ['./openlayer-example.component.css']
})
export class OpenlayerExampleComponent implements OnInit {
  tiffImage: TiffImage = {
    jobId: 1,
    imageUrl: 'assets/img/152179.png',
    extent: [-76.51367693405734, 42.42886985890468, -76.51169990480923, 42.42984853959061]
  };

  polygon: Array<LatLng> = [
    {
      lat: -76.51267693405734,
      lng: 42.42896985890468
    },
    {
      lat: -76.51277693405734,
      lng: 42.42906985890468
    },
    {
      lat: -76.51277693405734,
      lng: 42.42916985890468
    }
  ];

  openlayerTool = OpenLayerToolType;

  pointOptions: Array<Tool> = [
    {
      name: 'CAR',
      color: 'rgba(204,0,0,0.5)'
    },
    {
      name: 'CAR PRODUCTIONS',
      color: 'rgba(95,156,55,0.5)'
    }
  ];

  polygonOptions: Array<Tool> = [
    {
      name: 'CONCENTRATES',
      color: 'rgba(204,0,0,0.5)'
    },
    {
      name: 'STOCK',
      color: 'rgba(95,156,55,0.5)'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
```

### @Input

| Options | Type          | Description                                                 |
| ------- | ------------- | ----------------------------------------------------------- |
| image	  | TiffImage 		   | define jobid, image url, extent							|
| drawtype | OpenLayerToolType | define initial draw type   								|
| polygontyps | Array<Tool>    | define polygon draw types and it's color					|
| pointstyps  | Array<Tool>    | define points draw types and it's color					|
| points  	  | Array<LatLng>  | Define Map center according to given latitude and longitude|
| drawcolor   | string  	   | define initial draw color 									|

### @Output

| Options   | Type                   | Description                                  |
| --------- | ---------------------- | -------------------------------------------- |
| onDraw()   | ReturnObject | Return created points or polygon coordinates, job id, draw type, draw tool |
| onDelete() | ReturnObject | Return created points or polygon coordinates, job id, draw type, draw tool                |
