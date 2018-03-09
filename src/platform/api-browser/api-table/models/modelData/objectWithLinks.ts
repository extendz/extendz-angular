import { Links } from './links';

export class ObjectWithLinks {
  [key: string]: Object;
  _links?: Links;
}
