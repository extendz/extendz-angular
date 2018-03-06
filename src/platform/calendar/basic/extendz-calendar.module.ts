import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendzCalendarComponent } from './extendz-calendar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ExtendzCalendarComponent],
  exports: [ExtendzCalendarComponent]
})
export class ExtendzCalendarModule {}
