import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';

import { ApiImageExampleComponent } from './api-image-example.component';
import { ApiImageExampleRoutingModule } from './api-image-example-routing.module';

import { ExtendzDirectiveModule, ExtendzRestModule } from '../../../../platform';

@NgModule({
  imports: [
    CommonModule,
    ApiImageExampleRoutingModule,
    ExtendzDirectiveModule,
    ExtendzRestModule,
    // Material
    MatTabsModule
  ],
  declarations: [ApiImageExampleComponent]
})
export class ApiImageExampleModule {}
