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

import { ApiItemComponent } from './api-item.component';
import { ApiTableService } from '../api-table/api-table.service';
import { ApiItemService } from './api-item.service';

import { ExtendPipesModule } from '../../common/pipes/extend-pipes.module';
import { ExtendzApiSelectModule } from '../extendz-api-select/extendz-api-select.module';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    //Exentedz
    ExtendPipesModule,
    ExtendzApiSelectModule,
    //Mat
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule
  ],
  declarations: [ApiItemComponent],
  exports: [ApiItemComponent],
  providers: [ApiTableService, ApiItemService]
})
export class ExtendzApiItemModule {}
