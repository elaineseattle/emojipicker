import {
  generateM2MTokenFromClientIdAndSecret,
  MobileGateway,
  TokenEndPoints,
} from '@cigna/shared/webdriverio-util';
import { getValue } from '@wdio/shared-store-service';
import { Token } from '../auths/constants';
import { injectable } from 'inversify';

@injectable()
export class PersonRecordHubGateway extends MobileGateway {
  protected getGatewayUrl(): string {
    return 'https://api-qa.express-scripts.io';
  }

  async getToken(): Promise<string> {
    const tokenKey = `${driver.sessionId}_${Token.PersonRecordHubToken}`;
    let token = (await getValue(tokenKey)) as string;
    if (token === undefined) {
      await generateM2MTokenFromClientIdAndSecret({
        tokenKey,
        body: {
          grant_type: 'client_credentials',
          client_id: process.env.ESI_client_id ?? '',
          client_secret: process.env.ESI_client_secret ?? '',
        },
        baseUrl: this.getGatewayUrl(),
        tokenEndPoint: TokenEndPoints.ESI_O_AUTH,
      });
    }
    token = (await getValue(tokenKey)) as string;
    return token;
  }
}
