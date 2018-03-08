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

import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ext-calendar-advance',
  templateUrl: './extendz-calendar-advance.component.html',
  styleUrls: ['./extendz-calendar-advance.component.css']
})
export class ExtendzCalendarAdvanceComponent implements OnInit {
  /**
   * Current date
   */
  public today: Date = new Date();
  /***
   * Current month
   */
  public month: string;
  /***
   * Current selected day
   */
  public day: string;
  /**
   * Starting month of the calendar
   */
  @Input() startMonth: number = this.today.getMonth();
  /**
   * Starting year of the calendar
   */
  @Input() startYear: number = this.today.getFullYear();
  /***
   * Date Format for the selected date
   */
  @Input() dateFormat: string = 'dd/MM/yyyy';
  /***
   * Calendar date format
   */
  @Input() dayLabelFormat: string = 'EEE';
  /**
   * Calandar title format
   */
  @Input() titleFormat: string = 'LLLL yyyy';
  /**
   * Single date format
   */
  @Input() dayFormat: string = 'd';
  /**
   * Time zone to be used.
   */
  @Input() timeZone: string;
  /**
   * Dissable date selection
   */
  @Input() disableSelection: boolean = false;
  @Input() disableFutureSelection: boolean = false;

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {}

  onSelect(date: string) {
    this.month = this.datePipe.transform(date, this.titleFormat);
    this.day = this.datePipe.transform(date, this.dateFormat);
  }
} // class
