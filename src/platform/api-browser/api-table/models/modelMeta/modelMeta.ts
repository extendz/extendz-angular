import { Property } from './property';
import { Projection } from './projection';

export class ModelMeta {
  name: string;
  url: string;
  properties?: Property[];
  projections?: Projection[];
  projection?: Property[];
}
