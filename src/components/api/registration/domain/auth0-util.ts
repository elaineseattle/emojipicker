import { getGZipHeader, MobileGateway } from '@cigna/shared/webdriverio-util';
import { injectable, inject } from 'inversify';
import { SHARED_API_TYPES } from '../../shared/shared.symbols';
import { Auth0Gateway } from '../../shared/auth-0-gateway';
import { Auth0SearchUserResponse } from '../model/auth0-search-user.response';
import { Auth0EndPoints } from '../constants';
import { AxiosResponse } from 'axios';
import { Auth0Util } from '../interfaces';

@injectable()
export class Auth0UtilImpl implements Auth0Util {
  private _auth0AdminGateway: MobileGateway;

  constructor(
    @inject(SHARED_API_TYPES.Auth0Gateway) auth0AdminGateway: Auth0Gateway,
  ) {
    this._auth0AdminGateway = auth0AdminGateway;
  }

  async searchUserByLoginId(
    loginId: string,
  ): Promise<Auth0SearchUserResponse[]> {
    const allUsersByLoginId = await this._auth0AdminGateway.getResponse<
      Auth0SearchUserResponse[]
    >(`${Auth0EndPoints.User}?q=email:${loginId}`, {
      headers: getGZipHeader(),
    });
    expect(allUsersByLoginId.status).toBe(200);
    return allUsersByLoginId.data;
  }

  async searchUserByAuth0Id(
    auth0Id: string,
  ): Promise<AxiosResponse<Auth0SearchUserResponse>> {
    return this._auth0AdminGateway.getResponse<Auth0SearchUserResponse>(
      `${Auth0EndPoints.User}/${auth0Id}`,
      {
        headers: getGZipHeader(),
        validateStatus: (status) => [200, 404].includes(status),
      },
    );
  }

  async deleteUserByAuth0Id(auth0Id: string): Promise<void> {
    await this._auth0AdminGateway.deleteResponse<Auth0SearchUserResponse[]>(
      `${Auth0EndPoints.User}/${auth0Id}`,
      {
        headers: getGZipHeader(),
      },
    );

    const usersAfterDelete = await this.searchUserByAuth0Id(auth0Id);

    expect(usersAfterDelete.status).toBe(404);
  }

  async deleteUserByLoginId(loginId: string): Promise<void> {
    const users = await this.searchUserByLoginId(loginId);
    if (users.length > 0) {
      await this.deleteUserByAuth0Id(users[0].user_id);
    }
  }

  async searchAllUsers(): Promise<Auth0SearchUserResponse[]> {
    const searchUsers = await this._auth0AdminGateway.getResponse<
      Auth0SearchUserResponse[]
    >(Auth0EndPoints.User, {
      headers: getGZipHeader(),
    });
    expect(searchUsers.status).toBe(200);
    return searchUsers.data.filter((data) =>
      data.identities.some(
        (identity) =>
          identity.connection === 'Username-Password-Authentication',
      ),
    );
  }

  private async addUserToRoleAuthOId(
    auth0Id: string,
    roles: string[],
  ): Promise<void> {
    await this._auth0AdminGateway.postResponse(
      `/api/v2/users/${auth0Id}/roles`,
      {
        roles,
      },
    );
  }
  async addUserToByPassMFARole(loginId: string): Promise<void> {
    const users = await this.searchUserByLoginId(loginId);
    await this.addUserToRoleAuthOId(users[0].user_id, ['rol_7Pm4fXUakQCSgUwD']);
  }

  async addUserToPhoneAuthentication(
    loginId: string,
    phoneNumber?: string,
  ): Promise<void> {
    const users = await this.searchUserByLoginId(loginId);
    await this._auth0AdminGateway.postResponse(
      `/api/v2/users/${users[0].user_id}/authentication-methods`,
      this.getPhoneAuthenticationMethodsBody(phoneNumber ?? '9876543210'),
    );
  }

  private getPhoneAuthenticationMethodsBody(phoneNumber: string) {
    return {
      type: 'phone',
      phone_number: `+1${phoneNumber}`,
      preferred_authentication_method: 'sms',
    };
  }
}
