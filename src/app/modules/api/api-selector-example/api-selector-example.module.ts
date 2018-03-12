/**
 *    Copyright 2018 the original author or authors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiSelectorExampleRoutingModule } from './api-selector-example-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExtendzApiModule } from '../../../../platform';
import { ExtendzApiTableHostModule } from '../../../../platform/api-browser/api-table-host/extendz-api-table-host.module';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule
} from '@angular/material';
import { ApiSelectorExampleComponent } from './api-selector-example.component';
import { ExtendzApiSelectorModule } from '../../../../platform/api-browser/api-selector/extendz-api-selector.module';

@NgModule({
  imports: [
    CommonModule,
    ApiSelectorExampleRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    // Extend
    ExtendzApiSelectorModule,
    ExtendzApiTableHostModule,
    ExtendzApiModule.forRoot({
      svgIconSet: '/assets/svg/api-icons.svg'
    }),
    // Mat
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  declarations: [ApiSelectorExampleComponent]
})
export class ApiSelectorExampleModule {}
