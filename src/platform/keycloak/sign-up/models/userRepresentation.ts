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

import { CredentialRepresentation } from './credentialRepresentation';

export class UserRepresentationBase {
  enabled?: boolean;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Keycloack user representation.
 *
 * @author Randika Hapugoda
 * @see http://www.keycloak.org/docs-api/3.1/rest-api/index.html#_userrepresentation
 */
export class UserRepresentation extends UserRepresentationBase {
  credentials?: CredentialRepresentation[];
}

export class UserRepresentationDto extends UserRepresentationBase {
  password?: string;

  public static convert(dto: UserRepresentationDto): UserRepresentation {
    return {
      enabled: dto.enabled,
      email: dto.email,
      username: dto.username,
      firstName: dto.firstName,
      lastName: dto.lastName,
      credentials: [
        {
          type: dto.password,
          value: dto.password
        }
      ]
    };
  } // convert
}
