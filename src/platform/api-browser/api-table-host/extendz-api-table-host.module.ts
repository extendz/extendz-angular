import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiTableHostComponent } from './api-table-host.component';

import { ApiTableHostRoutingModule } from './api-table-host.routing.module';
import { ExtendzApiTableModule } from '../api-table/extendz-api-table.module';

@NgModule({
  imports: [ApiTableHostRoutingModule, CommonModule, ExtendzApiTableModule],
  declarations: [ApiTableHostComponent],
  exports: [ApiTableHostComponent]
})
export class ExtendzApiTableHostModule {}
