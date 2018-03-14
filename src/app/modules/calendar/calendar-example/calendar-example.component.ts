import { Component, OnInit, Input } from '@angular/core';
import { CalendarExampleService } from './calendar-example.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { CalendarEvent } from './models/calendarEvent';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.css']
})
export class CalendarExampleComponent implements OnInit {
  constructor(private service: CalendarExampleService) {}
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

  ngOnInit() {
    //this.events$ = this.service.getCalendarEvents();
  }
}
