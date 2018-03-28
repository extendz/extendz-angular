import { Property } from '../../../models';
import { ObjectWithLinks } from '../../../../common/services/rest/models';

export class DialogData {
  property?: Property;
  response?: ObjectWithLinks[];
}
