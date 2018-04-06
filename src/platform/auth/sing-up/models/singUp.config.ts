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

/**
 * @author Randika Hapugoda
 */
export interface ISingUpConfig {
  /**
   * URL to post the form data.
   */
  url?: string;
  fields: Field[];
}

export class SingUpConfig implements ISingUpConfig {
  fields: Field[];
  url: string;
  constructor(config: ISingUpConfig) {
    this.fields = config.fields;
    if (config.url) this.url = config.url;
  }
}

export class Field {
  title: string;
  type: FieldType;
  required?: boolean;
  pattern?: Pattern;
  min?: number = 1;
  max?: number;
}

export enum FieldType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
  Number = 'number',
  Date = 'date'
}

export class Pattern {
  pattern: string;
  errorMessage: string;
}
