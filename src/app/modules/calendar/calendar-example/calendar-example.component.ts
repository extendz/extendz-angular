import { Component, OnInit } from '@angular/core';
import { CalendarExampleService } from './calendar-example.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { CalendarEvent } from './models/calendarEvent';

@Component({
  selector: 'app-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.css']
})
export class CalendarExampleComponent implements OnInit {
  constructor(private service: CalendarExampleService) {}

  events$: Observable<CalendarEvent>;

  ngOnInit() {
    this.events$ = this.service.getCalendarEvents();
  }
}
