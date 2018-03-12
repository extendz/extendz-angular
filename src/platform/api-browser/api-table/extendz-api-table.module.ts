import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTableModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiTableComponent } from './api-table.component';
import { ApiTableRoutingModule } from './api-table-routing.module';
import { ApiTableService } from './api-table.service';

import { ExtendPipesModule, ExtendzRestModule } from '../../common';

@NgModule({
  imports: [
    CommonModule,
    ApiTableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    // Extend
    ExtendPipesModule,
    ExtendzRestModule,
    // Mat
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [ApiTableComponent],
  exports: [ApiTableComponent],
  providers: [ApiTableService]
})
export class ExtendzApiTableModule {}
