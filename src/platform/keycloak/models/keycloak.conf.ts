export class FrontAdmin {
  userName: string;
  password: string;
}

export interface IKeycloakConfig {
  server: string;
  realm: string;
  client_id: string;
  frontAdmin?: FrontAdmin;
}
export class KeycloakConfig implements IKeycloakConfig {
  server: string;
  realm: string;
  client_id: string;
  frontAdmin: FrontAdmin;

  constructor(private config: IKeycloakConfig) {
    this.server = config.server;
    this.realm = config.realm;
    this.client_id = config.client_id;
    if (config.frontAdmin) this.frontAdmin = config.frontAdmin;
  }
}
