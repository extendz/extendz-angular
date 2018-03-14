export enum RelationTypes {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  ENUM = 'ENUM'
}

export interface Property {
  name?: string;
  type?: string;
  required?: boolean;
  relationShipType?: RelationTypes;
  reference?: string;
}
