import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiTableHostComponent } from './api-table-host.component';

import { ApiTableHostRoutingModule } from './api-table-host.routing.module';
import { ExtendzApiTableModule } from '../api-table/extendz-api-table.module';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ApiTableHostRoutingModule,
    // Extendz
    ExtendzApiTableModule,
    // Mat
    MatIconModule,
    MatButtonModule
  ],
  declarations: [ApiTableHostComponent],
  exports: [ApiTableHostComponent]
})
export class ExtendzApiTableHostModule {}
