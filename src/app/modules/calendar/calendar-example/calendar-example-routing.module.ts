import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarExampleComponent } from './calendar-example.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarExampleRoutingModule {}
