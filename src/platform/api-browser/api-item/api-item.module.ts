import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatSnackBarModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatDatepickerModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiItemRoutingModule } from './api-item-routing.module';
import { ApiItemComponent } from './api-item.component';
import { ApiTableService } from '../api-table/api-table.service';
import { ApiItemService } from './api-item.service';

import { ExtendPipesModule } from '../../common/pipes/extend-pipes.module';
import { ApiItemAddDialogComponent } from './dialog/api-item-add-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ApiItemRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    //Exentedz
    ExtendPipesModule,
    //Mat
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule
  ],
  declarations: [ApiItemComponent, ApiItemAddDialogComponent],
  entryComponents: [ApiItemAddDialogComponent],
  exports: [ApiItemComponent],
  providers: [ApiTableService, ApiItemService]
})
export class ApiItemModule {}
