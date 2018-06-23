import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule } from '@angular/material';

import { ExtendzApiTableHostComponent } from './extendz-api-table-host.component';
import { ExtendzApiTableModule } from '../api-table/extendz-api-table.module';

@NgModule({
  imports: [
    CommonModule,
    // Extendz
    ExtendzApiTableModule,
    // Mat
    MatIconModule,
    MatButtonModule
  ],
  declarations: [ExtendzApiTableHostComponent],
  exports: [ExtendzApiTableHostComponent]
})
export class ExtendzApiTableHostModule {}
