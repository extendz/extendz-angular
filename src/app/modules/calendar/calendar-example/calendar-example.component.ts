import { Component, OnInit, Input } from '@angular/core';
import { CalendarExampleService } from './calendar-example.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { CalendarEvent } from './models/calendarEvent';
import { DatePipe } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.css']
})
export class CalendarExampleComponent implements OnInit {
  constructor(private service: CalendarExampleService) {}

  displayedColumns = ['Options', 'Type', 'Descriptions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  events$: Object[] = [];
  onSelect(clickDate: string) {
    this.events$ = [];
    this.service.getCalendarEvents().subscribe((results: CalendarEvent[]) => {
      for (let result of results) {
        if (result.date == clickDate) {
          this.events$.push(result);
        }
      }
    });
  }

  ngOnInit() {}
}

const ELEMENT_DATA: Element[] = [
  { Options: 'startMonth', Type: 'number', Descriptions: 'Get current month.' },
  { Options: 'startYear', Type: 'number', Descriptions: 'Get current year.' },
  {
    Options: 'dateFormat',
    Type: 'string',
    Descriptions:
      "If click the date.It retrieve the day.That date format set on 'dateFormat'. ('dd/MM/yyyy')"
  },
  {
    Options: 'dayLabelFormat',
    Type: 'string',
    Descriptions: "3-letter abbreviation of the literal representation of the day of week.('EEE')"
  },
  {
    Options: 'titleFormat',
    Type: 'string',
    Descriptions: "Show calendar title with month and year format.('LLLL yyyy')"
  },
  {
    Options: 'timeZone',
    Type: 'string',
    Descriptions: "The day of the month, from 1 through 31.('d')"
  },
  {
    Options: 'disableSelection',
    Type: 'boolean',
    Descriptions: "Disable previous month's days have in current month."
  },
  {
    Options: 'disableFutureSelection',
    Type: 'boolean',
    Descriptions: "Disable next month's days have in current month."
  }
];
export interface Element {
  Options: string;
  Type: string;
  Descriptions: string;
}
