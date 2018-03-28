import { ApiItemExampleRoutingModule } from './api-item-example-routing.module';
import { ExtendzApiItemHostModule } from '../../../../platform/api-browser/extendz-api-item-host/extendz-api-item-host.module';
import { CommonModule } from '@angular/common';
import { ApiItemExampleComponent } from './api-item-example.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    ApiItemExampleRoutingModule,
    //Extendz
    ExtendzApiItemHostModule
  ],
  declarations: [ApiItemExampleComponent]
})
export class ApiItemExampleModule {}
