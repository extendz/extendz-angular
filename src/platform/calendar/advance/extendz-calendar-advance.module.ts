import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExtendzCalendarAdvanceComponent } from './extendz-calendar-advance.component';
import { ExtendzCalendarModule } from '../basic/extendz-calendar.module';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, ExtendzCalendarModule, MatCardModule],
  declarations: [ExtendzCalendarAdvanceComponent],
  exports: [ExtendzCalendarAdvanceComponent]
})
export class ExtendzCalendarAdvanceModule {}
