import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CalendarEvent } from './models/calendarEvent';

@Injectable()
export class CalendarExampleService {
  constructor(private http: HttpClient) {}

  getCalendarEvents(): Observable<CalendarEvent> {
    return this.http.get<CalendarEvent>('assets/mock-db/calendar.json');
  }
}
