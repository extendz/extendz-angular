import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExtendzFileUploadComponent } from './extendz-file-upload.component';
import { ExtendPipesModule } from '../../common/pipes';
import { ExtendzRestModule } from '../../common/services';
import { ExtendzDirectiveModule } from '../../common/directives/extendz-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    // Extendz
    ExtendPipesModule,
    ExtendzRestModule,
    ExtendzDirectiveModule,
    // Mat
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  declarations: [ExtendzFileUploadComponent],
  exports: [ExtendzFileUploadComponent]
})
export class ExtendzFileUploadModule {}
