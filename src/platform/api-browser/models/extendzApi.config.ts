export interface IExtendzApiConfig {
  svgIconSet?: string;
  modelsEndpont?: string;
}

export class ExtendzApiConfig implements IExtendzApiConfig {
  svgIconSet: string;
  modelsEndpont?: string = 'models';

  constructor(private config: IExtendzApiConfig) {
    if (config.svgIconSet) this.svgIconSet = config.svgIconSet;
  }
}
