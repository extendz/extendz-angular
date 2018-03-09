import { Href } from './href';

export interface Links {
  first?: Href;
  self?: Href;
  next?: Href;
  last?: Href;
  profile?: Href;
  search?: Href;
  [key: string]: Object;
}
