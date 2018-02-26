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

export enum OpenLayerToolType {
    POINT,
    POLYGON,
}

export enum PointToolType {
    CAR,
    PRODUCTION_CAR
}

export enum PolygonToolType {
    CONCENTRATES,
    STOCK
}

export enum MoveToolType {
    MOVE
}

export class OpenLayerTool {

    getSource() {
        return new ol.source.Vector({ wrapX: true });
    } // End getSource ()

    getVectorLayer(source: ol.source.Vector, color: string): ol.layer.Vector {
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
    } // End _getVectorLayer()

    getStyle(color: string): ol.style.Style {
        return new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({ color: 'rgba(0,0,0,0.0)' }),
                stroke: new ol.style.Stroke({ color: color, width: 3 }),
                radius: 5
            }),
            fill: new ol.style.Fill({ color: color }),
            stroke: new ol.style.Stroke({ color: color, width: 3 }),
        });
    }// End _getMouseStyle()

    public static getBorderOnlyStyle(): ol.style.Style {
        return new ol.style.Style({
            fill: new ol.style.Fill({ color: 'rgba(0,0,0,0.0)' }),
            stroke: new ol.style.Stroke({ color: 'rgba(204,255,0,0.42)', width: 1 }),
        });
    }

    createDraw(source: ol.source.Vector, style: ol.style.Style, features: ol.Collection<ol.Feature>, clickTolerance?: number, type?: string) {
        return new ol.interaction.Draw({
            clickTolerance: 1000,
            features: features,
            type: 'Polygon',
            source: source,
            style: style,
            /**
             * If the middle/right mouse button is presseed then the draw event is blocked.It will trigger the Drag Pan/ finish draw event.
             */
            condition: (event: ol.MapBrowserEvent) => {
                let originalEvent: any = event.originalEvent;
                if (originalEvent.button == 1 || originalEvent.button == 21) return false;
                return true;
            },
            /**
             * On right click the draw should be stoped.
             */
            finishCondition: (event: ol.MapBrowserEvent) => {
                let originalEvent: any = event.originalEvent;
                if (originalEvent.button == 0) return true;
                return false;
            }
        });
    } // End createDraw()

}// End class OpenLayerTool