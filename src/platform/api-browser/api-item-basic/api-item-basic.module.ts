import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiItemBasicComponent } from './api-item-basic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { ExtendPipesModule } from '../../common/pipes';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApiItemService } from '../api-item/api-item.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FlexLayoutModule,
    // Extendz
    ExtendPipesModule,
    //Mat
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule
  ],
  providers: [ApiItemService],
  declarations: [ApiItemBasicComponent],
  exports: [ApiItemBasicComponent]
})
export class ExtendzApiItemBasicModule {}
