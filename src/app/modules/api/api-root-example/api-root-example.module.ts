import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRootExampleRoutingModule } from './api-root-example-routing.module';
import { ApiRootExampleComponent } from './api-root-example.component';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, ApiRootExampleRoutingModule, MatTabsModule],
  declarations: [ApiRootExampleComponent]
})
export class ApiRootExampleModule {}
