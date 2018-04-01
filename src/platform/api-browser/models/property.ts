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

export enum RelationTypes {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  ENUM = 'ENUM'
}

export interface Property {
  name?: string;
  type?: string;
  /***
   * The mapping name to the model
   */
  mappedBy?: string;
  /**
   * Bind a object value from the same object to a onther property in the same object.
   * Very rare in use.
   */
  mappedBySource?: string;
  required?: boolean;
  relationShipType?: RelationTypes;
  reference?: string;
}
