export enum RelationTypes {
  OneToOne = 'onetoone'
}

export interface Property {
  name?: string;
  type?: string;
  required?: boolean;
  relation?: RelationTypes;
}
