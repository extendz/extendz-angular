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
import { Routes, RouterModule } from '@angular/router';

import { ApiRootComponent } from './api-root.component';

const routes: Routes = [
  {
    path: '',
    component: ApiRootComponent
  },
  {
    path: ':name',
    loadChildren: '../api-table-host/extendz-api-table-host.module#ExtendzApiTableHostModule'
  }
  // {
  //   path: 'entity/:name/:id',
  //   loadChildren: './entity/entity.module#EntityModule'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRootRoutingModule {}
