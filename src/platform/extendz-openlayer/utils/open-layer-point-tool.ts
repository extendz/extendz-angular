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

export class PointTool {
    
    constructor() { }

    source: ol.source.Vector;
    feature: ol.Collection<ol.Feature>;

    vector: ol.layer.Vector;
    mouseStyle: ol.style.Style;
    
    /**
     * 1. Define source
     * 2. Define vector layer
     * 3. Define mouse style
     */

    creatNewDraw(color:string){
        this.source = this.getSource();
        this.vector = this.getVectorLayer(this.source, color);
        this.mouseStyle = this.getMouseStyle(color);
        return {draw :this.createDraw(this.source, this.mouseStyle, this.feature),style : this.mouseStyle,source : this.source};
    }

    private getSource() {
        return new ol.source.Vector({ wrapX: true });
    } // End getSource ()

    private getMouseStyle(color: string): ol.style.Style {
        return new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({ color: color }),
                stroke: new ol.style.Stroke({ color: color }),
                radius: 5
            })
        });
    }// End getMouseStyle()

   private getVectorLayer(source: ol.source.Vector, color: string): ol.layer.Vector {
        return new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 3,
                    fill: new ol.style.Fill({
                        color: color
                    })
                })
            })
        });
    } // End getVectorLayer()

   private createDraw(source: ol.source.Vector, style: ol.style.Style, features: ol.Collection<ol.Feature>) {
        return new ol.interaction.Draw({
            clickTolerance: 1000,
            features: features,
            type: 'Point',
            source: source,
            style: style,
        });
    } // End createDraw()

}// End class PointTool