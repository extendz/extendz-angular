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
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ApiRootService } from './api-root.service';

import { ApiRootRoutingModule } from './api-root-routing.module';
import { ApiRootComponent } from './api-root.component';

import { ExtendPipesModule, RestService } from '../../common';

@NgModule({
  imports: [
    CommonModule,
    ApiRootRoutingModule,
    FlexLayoutModule,
    // Extentz
    ExtendPipesModule,
    // Mat
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule
  ],
  declarations: [ApiRootComponent],
  exports: [ApiRootComponent],
  providers: [ApiRootService, RestService]
})
export class ExtendzApiRootModule {}
