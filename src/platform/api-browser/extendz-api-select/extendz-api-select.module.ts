import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule
} from '@angular/material';

import { ExtendzApiSelectComponent } from './extendz-api-select.component';
import { ExtendPipesModule } from '../../common/pipes';
import { ExtendzApiTableModule } from '../api-table/extendz-api-table.module';
import { ApiTableService } from '../api-table/api-table.service';
import { ApiItemAddDialogComponent } from './dialog/api-item-add-dialog.component';
import { ExtendzApiItemBasicModule } from '../api-item-basic/api-item-basic.module';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    // Extendz
    ExtendPipesModule,
    ExtendzApiTableModule,
    ExtendzApiItemBasicModule,
    // Mat
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [ExtendzApiSelectComponent, ApiItemAddDialogComponent],
  entryComponents: [ApiItemAddDialogComponent],
  exports: [ExtendzApiSelectComponent],
  providers: [ApiTableService]
})
export class ExtendzApiSelectModule {}
