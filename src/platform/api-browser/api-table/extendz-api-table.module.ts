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
import { ApiTableService } from './api-table.service';

import { ExtendPipesModule } from '../../common';
import { ExtendzApiItemModule } from '../api-item/extendz-api-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    // Extend
    ExtendPipesModule,
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
