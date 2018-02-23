import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRootExampleRoutingModule } from './api-root-example-routing.module';
import { ApiRootExampleComponent } from './api-root-example.component';

@NgModule({
  imports: [
    CommonModule,
    ApiRootExampleRoutingModule
  ],
  declarations: [ApiRootExampleComponent]
})
export class ApiRootExampleModule {}
