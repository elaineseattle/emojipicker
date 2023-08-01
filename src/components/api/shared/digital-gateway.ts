import { MobileGateway, Token } from '@cigna/shared/webdriverio-util';
import { injectable } from 'inversify';
import { getValue } from '@wdio/shared-store-service';

export enum DigitalGatewayEndPoints {
  DEV = 'https://d-health-kit.dev.digitaledge.evernorth.com',
  SIT = 'https://a-health-kit.test.digitaledge.evernorth.com',
}
@injectable()
export class DigitalGateway extends MobileGateway {
  protected getGatewayUrl(): string {
    return DigitalGatewayEndPoints.SIT;
  }

  protected getToken(): Promise<string> {
    return getValue(Token.UserAuth0).then((token) => token as string);
  }
}
