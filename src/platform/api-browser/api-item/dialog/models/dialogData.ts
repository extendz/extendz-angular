import { Property } from '../../../api-table/models/modelMeta/property';

import { ObjectWithLinks } from '../../../../common/services/rest/models/objectWithLinks';

export class DialogData {
  property?: Property;
  response?: ObjectWithLinks[];
}
