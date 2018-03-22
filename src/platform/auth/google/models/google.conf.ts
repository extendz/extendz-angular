import { ExchangeServer } from '../../index';

export class GoogleConf {
  client_id: string;
  scope?: string;
  /**
   * On success login the userinfo will be saved on localstorage.
   */
  saveOnSuccess?: boolean;
  /**
   * On sucess login the token will be exchange to a internal token
   */
  exchangeServer?: ExchangeServer;
}
