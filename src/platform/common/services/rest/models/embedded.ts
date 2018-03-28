import { ObjectWithLinks } from "./objectWithLinks";

export interface Embedded {
  [key: string]: ObjectWithLinks[];
}
