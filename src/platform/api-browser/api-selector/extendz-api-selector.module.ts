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
import { ExtendzRestModule } from '../../index';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExtendzApiTableModule } from '../api-table/extendz-api-table.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import {
  MatSelectModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatTableModule,
  MatCheckboxModule,
  MatIconModule,
  MatPaginatorModule
} from '@angular/material';
import { ApiSelectorComponent } from './api-selector.component';
import { ApiSearchService } from '../services/api-search.service';
import { DialogComponent } from '../api-selector/dialog/dialog.component';
import { DialogModule } from '../api-selector/dialog/dialog.module';

@NgModule({
  imports: [
    CommonModule,
    ExtendzRestModule,
    ReactiveFormsModule,
    FormsModule,
    //extendz
    ExtendzApiTableModule,
    // CDK
    OverlayModule,
    A11yModule,
    ScrollDispatchModule,
    //Mat
    MatSelectModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule
  ],
  declarations: [ApiSelectorComponent, DialogComponent],
  exports: [ApiSelectorComponent],
  providers: [ApiSearchService],
  entryComponents: [DialogComponent]
})
export class ExtendzApiSelectorModule {}
