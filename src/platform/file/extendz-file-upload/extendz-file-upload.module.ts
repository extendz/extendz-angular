import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExtendzFileUploadComponent } from './extendz-file-upload.component';
import { ExtendPipesModule } from '../../common/pipes';
import { ExtendzRestModule } from '../../common/services';

@NgModule({
  imports: [CommonModule, MatButtonModule, FlexLayoutModule, ExtendPipesModule, ExtendzRestModule],
  declarations: [ExtendzFileUploadComponent],
  exports: [ExtendzFileUploadComponent]
})
export class ExtendzFileUploadModule {}
