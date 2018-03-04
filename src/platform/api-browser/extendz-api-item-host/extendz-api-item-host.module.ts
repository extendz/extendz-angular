import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendzApiItemHostComponent } from './extendz-api-item-host.component';
import { ExtendzApiItemHostRoutingModule } from './extendz-api-item-host-routing.module';
import { ExtendzApiItemModule } from '../api-item/extendz-api-item.module';


@NgModule({
  imports: [CommonModule, ExtendzApiItemModule, ExtendzApiItemHostRoutingModule],
  declarations: [ExtendzApiItemHostComponent]
})
export class ExtendzApiItemHostModule {}
