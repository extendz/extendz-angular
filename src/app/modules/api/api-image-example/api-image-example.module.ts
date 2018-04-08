import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiImageExampleComponent } from './api-image-example.component';
import { ApiImageExampleRoutingModule } from './api-image-example-routing.module';
import { MatTabsModule } from '@angular/material';
import { ExtendzDirectiveModule } from '../../../../platform/common/directives/extendz-directives.module';
import { ExtendzRestModule } from '../../../../platform/common/services/rest/extendz-rest.module';

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
