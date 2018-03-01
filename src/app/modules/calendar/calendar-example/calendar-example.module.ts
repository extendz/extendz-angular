import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarExampleComponent } from './calendar-example.component';
import { CalendarExampleRoutingModule } from './calendar-example-routing.module';

@NgModule({
  imports: [CommonModule, CalendarExampleRoutingModule],
  declarations: [CalendarExampleComponent]
})
export class CalendarExampleModule {}
