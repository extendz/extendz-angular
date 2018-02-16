import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, IndexRoutingModule, MatButtonModule],
  declarations: [IndexComponent]
})
export class IndexModule {}
