import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExtendzCalendarComponent } from './extendz-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    // Material
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [ExtendzCalendarComponent],
  exports: [ExtendzCalendarComponent],
  providers: [DatePipe]
})
export class ExtendzCalendarModule {}
