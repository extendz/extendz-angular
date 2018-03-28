import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtendzApiItemHostComponent } from './extendz-api-item-host.component';
import { ExtendzApiItemModule } from '../api-item/extendz-api-item.module';

@NgModule({
  imports: [CommonModule, ExtendzApiItemModule],
  exports: [ExtendzApiItemHostComponent],
  declarations: [ExtendzApiItemHostComponent],
})
export class ExtendzApiItemHostModule {}
