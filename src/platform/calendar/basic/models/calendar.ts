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

import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';

export class Calendar {
  year: number;
  start: Date;

  weekStartsOn: number;
  noOfDays: number;
  weeks: number | Date[][];

  constructor(public startYear: number, public startMonth: number) {
    this.init(startYear, startMonth);
  } // constructor

  init(year: number, month: number) {
    if (month < 0) {
      year = year - 1;
      month = 11;
    }

    this.weekStartsOn = this.setWeekStartsOn(0);
    this.noOfDays = this.setNoOfDays(0);

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let monthLength: number = daysInMonth[month];

    // Figure out if is a leap year.
    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        monthLength = 29;
      }
    }

    // First day of calendar month.
    this.start = new Date(year, month, 1);

    let date: Date = new Date(this.start.valueOf());
    if (date.getDate() === 1) {
      while (date.getDay() !== this.weekStartsOn) {
        date.setDate(date.getDate() - 1);
        monthLength++;
      }
    }

    if (this.noOfDays !== 0) {
      while (this.noOfDays % 7 !== 0) {
        this.noOfDays++;
      }
      monthLength = this.noOfDays;
    } else {
      // Last day of calendar month.
      while (monthLength % 7 !== 0) {
        monthLength++;
      }
    }

    // Last day of calendar month.
    while (monthLength % 7 !== 0) {
      monthLength++;
    }

    this.weeks = [];
    for (let i = 0; i < monthLength; ++i) {
      // Let's start a new week.
      if (i % 7 === 0) {
        this.weeks.push([]);
      }
      // Add copy of the date. If not a copy,
      // it will get updated shortly.
      this.weeks[this.weeks.length - 1].push(new Date(date.valueOf()));
      // Increment it.
      date.setDate(date.getDate() + 1);
    }
  } // init()

  setWeekStartsOn(i: number) {
    let d = i || 0;
    if (!isNaN(d) && d >= 0 && d <= 6) {
      this.weekStartsOn = d;
    } else {
      this.weekStartsOn = 0;
    }
    return this.weekStartsOn;
  } // setWeekStartsOn()

  setNoOfDays(i: number) {
    var d = i || 0;
    if (!isNaN(d) && d > 0) {
      this.noOfDays = d;
    } else {
      this.noOfDays = 0;
    }
    return this.noOfDays;
  } //  setNoOfDays()

  previous(): void {
    this.init(this.start.getFullYear(), this.start.getMonth() - 1);
  } // previous()

  next(): void {
    if (this.start.getMonth() < 11) {
      this.init(this.start.getFullYear(), this.start.getMonth() + 1);
      return;
    }
    this.init(this.start.getFullYear() + 1, 0);
  } // next()
} // class
