import { Links } from "./links";
import { Page } from "./page";
import { Embedded } from "./embedded";

export interface TableResponse {
  _embedded?: Embedded;
  _links?: Links;
  page?: Page;
}
