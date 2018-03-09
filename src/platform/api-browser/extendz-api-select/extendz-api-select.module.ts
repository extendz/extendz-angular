import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatIconModule, MatButtonModule, MatDialogModule } from '@angular/material';

import { ExtendzApiSelectComponent } from './extendz-api-select.component';
import { ExtendPipesModule } from '../../common/pipes';
import { ApiItemAddDialogComponent } from '../api-item/dialog/api-item-add-dialog.component';
import { ExtendzApiTableModule } from '../api-table/extendz-api-table.module';
import { ApiTableService } from '../api-table/api-table.service';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    // Extendz
    ExtendPipesModule,
    ExtendzApiTableModule,
    // Mat
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [ExtendzApiSelectComponent, ApiItemAddDialogComponent],
  entryComponents: [ApiItemAddDialogComponent],
  exports: [ExtendzApiSelectComponent],
  providers: [ApiTableService]
})
export class ExtendzApiSelectModule {}
