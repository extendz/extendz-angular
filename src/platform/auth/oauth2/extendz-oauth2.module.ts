/*
* Copyright 2012-2018 the original author or authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

import { CovalentLoadingModule } from '@covalent/core/loading';

import { Oauth2Service } from './oauth2.service';
import { Oauth2Component } from './oauth2.component';
import { ExtendzAuthCommonModule } from '../common';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    // Covalent
    ExtendzAuthCommonModule,
    CovalentLoadingModule,
    // Material modules
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  declarations: [Oauth2Component],
  providers: [Oauth2Service],
  exports: [Oauth2Component]
})
export class ExtendzOauth2Module {}
