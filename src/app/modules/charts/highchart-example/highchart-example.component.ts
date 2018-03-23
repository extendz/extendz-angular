import { Component, OnInit } from '@angular/core';
import { HighchartComponent } from '../../../../platform/charts/highchart/highchart.component';

@Component({
  selector: 'app-highchart-example',
  templateUrl: './highchart-example.component.html',
  styleUrls: ['./highchart-example.component.css']
})
export class HighchartExampleComponent implements OnInit {
  /**
   * Highchart options object to draw chart.
   */
  public options: Highcharts.Options = {
    chart: {
      renderTo: 'container',
      type: 'bar'
    },
    series: [
      {
        name: 'Jane',
        data: [1, 0, 4]
      }
    ]
  };

  /**
   * Highchart options_bar object to draw chart.
   */
  public options_bar: Highcharts.Options = {
    chart: {
      renderTo: 'container',
      type: 'bar'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      }
    },
    series: [
      {
        name: 'Jane',
        data: [1, 0, 4]
      },
      {
        name: 'John',
        data: [5, 7, 3]
      }
    ]
  };

  constructor() {}

  ngOnInit() {}
}
