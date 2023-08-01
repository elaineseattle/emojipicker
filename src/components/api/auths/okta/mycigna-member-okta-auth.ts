import { setValue } from '@wdio/shared-store-service';
import { DEFAULT_PASSWORD } from '../../../shared/constants';
import { OktaUtil, Token } from '@cigna/shared/webdriverio-util';
import { injectable } from 'inversify';

export enum OKTAEndPoints {
  DEV = 'https://d.login.my.cigna.com',
  INT = 'https://a.login.my.cigna.com',
}

export enum RedirectURIEndPoints {
  DEV = 'com.oktapreview.d-mycigna:/callback',
  INT = 'com.oktapreview.a-mycigna:/callback',
}

export enum OKTAClientID {
  DEV = 'Y3rH4s3r91rMhPZxe3Lf',
  INT = 'tWkJWsIBpzqDeU1ziYSx',
}

@injectable()
export class MyCignaOktaAuth extends OktaUtil {
  private _environment!: string;

  oktaEnvUrl(): string {
    this._environment = process.env.APP_ENV_API || 'INT';
    return this._environment === 'INT' ? OKTAEndPoints.INT : OKTAEndPoints.DEV;
  }

  oktaClientId(): string {
    return this._environment === 'INT' ? OKTAClientID.INT : OKTAClientID.DEV;
  }

  getStateToken(): string {
    return 'zG18cpMhmarh4h6HHxcU4S_yvzH30oY573-1XACzvho';
  }

  getNonce(): string {
    return 'qp9eTsy8SbGf6SiGtXlUW-JRTEfkulRQpTrqry9ZR9Y';
  }

  getRedirectUrl(): string {
    return this._environment === 'INT'
      ? RedirectURIEndPoints.INT
      : RedirectURIEndPoints.DEV;
  }

  getScope(): string {
    return 'openid profile offline_access';
  }

  getSharedStoreKey(): string {
    return Token.JWT;
  }

  getDefaultPassword(): string {
    return DEFAULT_PASSWORD;
  }

  async setToken(ssoId?: string, password?: string): Promise<string> {
    const auth = await this.callAuth(
      ssoId || this.getDefaultUserName(),
      password || this.getDefaultPassword(),
    );
    const authorizeResponse = await this.callOktaAuthAndGetCode(auth);
    const dataCode = this.getCodeFromResponseHeader(authorizeResponse);
    const token = await this.callTokenAPI(dataCode);
    await setValue(this.getSharedStoreKey(), token.access_token);
    return token.access_token;
  }
}
