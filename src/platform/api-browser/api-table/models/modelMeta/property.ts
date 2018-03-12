export enum RelationTypes {
  SINGLE = 'SINGLE',
  MUTIPLE = 'MUTIPLE',
  ENUM = 'ENUM'
}

export interface Property {
  name?: string;
  type?: string;
  required?: boolean;
  relationShipType?: RelationTypes;
  reference?: string;
}
