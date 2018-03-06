import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule, MatCardModule } from '@angular/material';

import { CovalentHighlightModule } from '@covalent/highlight';

import { CalendarExampleComponent } from './calendar-example.component';
import { CalendarExampleRoutingModule } from './calendar-example-routing.module';
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
    MatCardModule
  ],
  declarations: [CalendarExampleComponent]
})
export class CalendarExampleModule {}
