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
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTableModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiTableComponent } from './api-table.component';
import { ApiTableRoutingModule } from './api-table-routing.module';
import { ApiTableService } from './api-table.service';
import { ApiSearchService } from '../services/api-search.service';

import { ExtendPipesModule, ExtendzRestModule } from '../../common';

@NgModule({
  imports: [
    CommonModule,
    ApiTableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    // Extend
    ExtendPipesModule,
    ExtendzRestModule,
    // Mat
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [ApiTableComponent],
  exports: [ApiTableComponent],
  providers: [ApiTableService, ApiSearchService]
})
export class ExtendzApiTableModule {}
