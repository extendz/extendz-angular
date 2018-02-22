# @extendz/extendz-google-map

## demo
 you can find example and demo [here](https://extendz.github.io/extendz-live/map)

## per request 

* angular 2,4,5
* nodejs 6 or above
* npm

## installation 

`npm i @extendz/extendz-google-map`

## usage

### mapexample.module.ts

```typescript 
import { ExtendzGoogleMapModule } from ‘@extendz/extendz-google-map’;

@NgModule({
	imports: [
		CommonModule,
		ExtendzGoogleMapModule.forRoot({
			apiKey:"AIzaSyCGqeyOzgZyvKq0kwn3", ←--- Google map key
		})
	],
})

export class MapexampleModule {}

```

### mapexample.component.html

```html
<div style="height: 90vh">
	<extendz-google-map 
		[center]= "latLng"  ←-- LatLng Object ex :- {lat:23.3872873, lng:45.3443344}
		[zoom] ="4"  ←-- map zoom level
	>
	</extendz-google-map>
</div>
```

### mapexample.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { LatLng } from '@extendz/extendz-google-map';

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
	
	constructor() { }

	ngOnInit() {
	}

}
```

### @Input

Options | Type | Description
------- | ---- | -----------
markers | Array<LatLng> | Create markers for given coordinates 
advance | Boolean | Show hide tool bar(default: false ) 
zoom | Number | Zoom level 
center | LatLng | Define Map center according to given latitude and longitude


### @Output

 Options | Type | Description
------- | ---- | -----------
onCrop() | Array<LatLngInterface> | Return created points or polygon coordinates 
onClose() | Boolean | On close return true or false 
