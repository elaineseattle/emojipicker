import {
  generateM2MTokenFromClientIdAndSecret,
  MobileGateway,
  TokenEndPoints,
} from '@cigna/shared/webdriverio-util';
import { getValue } from '@wdio/shared-store-service';
import { Token } from '../auths/constants';
import { injectable } from 'inversify';

@injectable()
export class Auth0Gateway extends MobileGateway {
  protected getGatewayUrl(): string {
    return 'https://universal-digital-dev.aa2-dev.auth0.com';
  }

  async getToken(): Promise<string> {
    const tokenKey = `${driver.sessionId}_${Token.Auth0GatewayToken}`;
    let token = (await getValue(tokenKey)) as string;
    if (token === undefined) {
      await generateM2MTokenFromClientIdAndSecret({
        tokenKey,
        body: {
          grant_type: 'client_credentials',
          client_id: process.env.AUTH0_REGISTRATION_CLIENT_ID ?? '',
          client_secret: process.env.AUTH0_REGISTRATION_CLIENT_SECRET ?? '',
          audience: `${this.getGatewayUrl()}/api/v2/`,
        },
        baseUrl: this.getGatewayUrl(),
        tokenEndPoint: TokenEndPoints.OAUTH_TOKEN,
      });
    }
    token = (await getValue(tokenKey)) as string;
    return token;
  }
}
