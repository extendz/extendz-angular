/*
* Copyright 2012-2018 the original author or authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'ext-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.css']
})
export class HighchartComponent implements OnInit {
  /**
   * Highchart options to draw an chart
   */
  @Input() options: Highcharts.Options = {};

  @ViewChild('chart') chart: ElementRef;

  constructor() {}

  ngOnInit() {
    Highcharts.chart(this.chart.nativeElement, this.options);
  } // End ngOnInit
}
