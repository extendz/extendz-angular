import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiTableExampleComponent } from './api-table-example.component';
import { ApiTableExampleRoutingModule } from './api-table-example-routing.module';
import { ExtendzApiTableHostModule } from '../../../../platform';

@NgModule({
  imports: [CommonModule, ApiTableExampleRoutingModule, ExtendzApiTableHostModule],
  declarations: [ApiTableExampleComponent]
})
export class ApiTableExampleModule {}
