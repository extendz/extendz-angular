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
 * Standard user info
 * @author Randika Hapugoda
 * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
 */
export class UserInfo {
  /**
   * Subject - Identifier for the End-User at the Issuer.
   */
  sub?: string;
  /**
   * End-User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the End-User's locale and preferences.
   */
  name?: string;
  /**
   * Given name(s) or first name(s) of the End-User. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.
   */
  given_name?: string;
  /**
   * Surname(s) or last name(s) of the End-User. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.
   */
  family_name?: string;
  /**
   * image. Note that this URL SHOULD specifically reference a profile photo of the End-User suitable for displaying when describing the End-User, rather than an arbitrary photo taken by the End-User.
   */
  picture?: string;
  /**
   * Shorthand name by which the End-User wishes to be referred to at the RP, such as janedoe or j.doe. This value MAY be any valid JSON string including special characters such as @, /, or whitespace. The RP MUST NOT rely upon this value being unique
   */
  preferred_username?: string;

  /** URL of the End-User's profile page. The contents of this Web page SHOULD be about the End-User. */
  profile?: string;
  /** End-User's preferred e-mail address. Its value MUST conform to the RFC 5322 [RFC5322] addr-spec syntax. The RP MUST NOT rely upon this value being unique, as discussed in Section 5.7. */
  email?: string;
}
