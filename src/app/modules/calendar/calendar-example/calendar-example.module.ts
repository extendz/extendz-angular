import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTabsModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule
} from '@angular/material';
import { CovalentHighlightModule } from '@covalent/highlight';

import { CalendarExampleComponent } from './calendar-example.component';
import { CalendarExampleRoutingModule } from './calendar-example-routing.module';
import { CalendarExampleService } from './calendar-example.service';

import { ExtendzCalendarModule } from '../../../../platform';

@NgModule({
  imports: [
    CommonModule,
    CalendarExampleRoutingModule,
    FlexLayoutModule,
    CovalentHighlightModule,
    // Extendz
    ExtendzCalendarModule,
    // Mat
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule
  ],
  declarations: [CalendarExampleComponent],
  providers: [CalendarExampleService]
})
export class CalendarExampleModule {}
