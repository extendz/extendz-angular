import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiExampleRoutingModule } from './api-example-routing.module';
import { ExtendzApiModule, ExtendzApiRootModule } from '../../../platform';
import { ApiItemExampleComponent } from './api-item-example/api-item-example.component';

@NgModule({
  imports: [
    CommonModule,
    ApiExampleRoutingModule,
    ExtendzApiModule.forRoot({
      svgIconSet: 'assets/svg/api-icons.svg'
    })
  ]
})
export class ApiExampleModule {}
