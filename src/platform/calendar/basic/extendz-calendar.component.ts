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

import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ObservableMedia } from '@angular/flex-layout';

import { Calendar } from './models/calendar';
import { Color } from 'openlayers';

@Component({
  selector: 'ext-calendar',
  templateUrl: './extendz-calendar.component.html',
  styleUrls: ['./extendz-calendar.component.scss']
})
export class ExtendzCalendarComponent implements OnInit {
  selectDate: string;
  today: Date = new Date();

  @Output() select: EventEmitter<string> = new EventEmitter<string>();

  @Input() startMonth: number = this.today.getMonth();
  @Input() startYear: number = this.today.getFullYear();

  @Input() dateFormat: string = 'dd/MM/yyyy';
  @Input() dayLabelFormat: string = 'EEE';
  @Input() titleFormat: string = 'LLLL yyyy';
  @Input() dayFormat: string = 'd';

  @Input() timeZone: string;
  @Input() disableSelection: boolean = false;
  @Input() disableFutureSelection: boolean = false;

  public calendar: Calendar;

  constructor(private datePipe: DatePipe, public media: ObservableMedia) {} // constructor

  /**
   * @author Randika Hapugoda
   * @method ngOnInit
   * @description Show current month's days on calendar
   */
  ngOnInit() {
    this.calendar = new Calendar(this.startYear, this.startMonth);
    this.onDayClick(this.today);
  } // ngOnInit()

  /**
   * @author Randika Hapugoda
   * @method isToday
   * @param date
   * @description Check the date is same date of today.
   */
  isToday(date: Date) {
    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    if (date.getTime() === today.getTime()) {
      return true;
    }
    return false;
  } // isToday()

  /**
   * @author Randika Hapugoda
   * @method previous
   * @description Show previous month of calendar when clicked previous() method.
   */
  previous() {
    this.calendar.previous();
  } // previous()

  /**
   * @author Randika Hapugoda
   * @method next
   * @description Show next month of calendar when clicked next() method.
   */
  next() {
    this.calendar.next();
  } // next()

  /**
   * @author Randika Hapugoda
   * @method onDayClick
   * @param date
   * @description When clicked the one of day on calendar their retrieve date.
   * And emit that day for select event to calendar-date component.
   */
  selectDay: Date;
  onDayClick(day: Date) {
    this.selectDate = this.datePipe.transform(day, this.dateFormat);
    this.select.emit(this.selectDate);
    this.selectDay = day;
  } // onDayClick()

  /**
   * @author Randika Hapugoda
   * @method sameMonth
   * @param date
   * @param startDateOfMonth
   * @param noOfDays
   * @description Current month's days only showing.
   */
  isDisabled(date: Date, startDateOfMonth: number, noOfDays: number) {
    if (noOfDays != 0 && noOfDays) {
      let dateStart: Date = new Date(
        this.calendar.start.getFullYear(),
        this.calendar.start.getMonth(),
        startDateOfMonth
      );

      let dateEnd: Date = new Date(dateStart.getTime());

      dateEnd.setDate(dateStart.getDate() + noOfDays);
      if (date.getDate() <= dateStart.getDate() && date.getDate() >= dateEnd.getDate()) {
        return true;
      }
    }
    if (this.disableSelection) {
      return true;
    }
    if (this.disableFutureSelection && date > new Date()) {
      return true;
    }
    return !this.sameMonth(date);
  } // isDisabled()

  /**
   * @author Randika Hapugoda
   * @method sameMonth
   * @param date
   * @description Check the current month is same of this month.
   */
  sameMonth(date: Date) {
    let d: Date = new Date(date.getTime());
    return (
      d.getFullYear() === this.calendar.start.getFullYear() &&
      d.getMonth() === this.calendar.start.getMonth()
    );
  } // sameMonth()
} // class
