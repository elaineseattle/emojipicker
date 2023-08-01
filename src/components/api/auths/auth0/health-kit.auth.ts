import { injectable } from 'inversify';
import { Auth0Util, Token } from '@cigna/shared/webdriverio-util';

@injectable()
export class HealthKitAuth0 extends Auth0Util {
  getBaseUrl(): string {
    return 'https://dev.d-universal.login.evernorth.com';
  }

  getClientId(): string {
    return '8mlL6LCKdBNM92ROgcO5ZCaBIoDhdxX6';
  }

  getTokenStoreKey(): string {
    return Token.UserAuth0;
  }

  getRedirectUri(): string {
    return 'com.cigna.mobile.evernorth.healthkit.enterprise://dev.d-universal.login.evernorth.com/ios/com.cigna.mobile.evernorth.healthkit.enterprise/callback';
  }

  getScope(): string[] {
    return ['openid', 'profile', 'email'];
  }
}
