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

/**
 * Oauth2 Server configurations.
 * @author Randika Hapugoda
 */
export class Oauth2Config {
  /**
   * Token url
   */
  tokenUrl: string;

  /**
   * User Information url
   */
  userInfoUrl: string;

  /**
   * Logout url
   */
  logoutUrl?: string;

  /**
   * Scopes
   */
  scope?: string;

  /**
   * Grant type.
   * Ex:Password
   */
  grantType?: string;

  /**
   * Client Secret
   */
  clientSecret?: string;

  /**
   * Client Id
   */
  clinetId?: string;
}
