import { Property } from './property';
import { Projection } from './projection';

export class ModelMeta {
  name: string;
  url: string;
  title?: string;
  properties?: Property[];
  projections?: {
    [key: string]: Property[];
  };
}
