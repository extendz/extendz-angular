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

import * as ol from 'openlayers';

import { OpenLayerTool } from "./open-layer-tool";

export class PolygonTool extends OpenLayerTool {

    private feature: ol.Collection<ol.Feature>;

    public source: ol.source.Vector;
    public vector: ol.layer.Vector;
    public style: ol.style.Style;
    public draw: ol.interaction.Draw;

    createNewDraw(color:string){
        this.source = super.getSource();
        this.style = super.getStyle(color);
        this.vector = super.getVectorLayer(this.source, color);
        this.draw = super.createDraw(this.source, this.style, this.feature, 1000, 'Polygon');
        
        return { source: this.source, vector: this.vector, style: this.style, draw: this.draw }
    }
}