export class KeycloakSignUpConfig {
  fields?: Field[];
}

export class Field {
  name: FeildTypes;
  required?: boolean;
  pattern?: Pattern;
  min?: number = 1;
  max?: number;
}

export enum FeildTypes {
  Username = 'username',
  Password = 'password',
  Email = 'email',
  firstName = 'firstName',
  lastName = 'lastName'
}

export class Pattern {
  pattern: string;
  errorMessage: string;
}
