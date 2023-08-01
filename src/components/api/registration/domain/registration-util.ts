import {
  Auth0Util,
  PersonRecordHubSearchAPI,
  RegistrationUtil,
} from '../interfaces';
import { REGISTRATION_TYPES } from '../../../features/registration/registration.symbols';
import { inject, injectable } from 'inversify';
import { SHARED_API_TYPES } from '../../shared/shared.symbols';
import { Auth0SearchUserResponse } from '../model/auth0-search-user.response';
import { UserDemographicDetails } from '../model/demographic-details.model';
import {
  RegisterUserAPIRequest,
  RegisterUserAPIResponse,
} from '../model/register-user-response.model';
import { DigitalGateway } from '../../shared/digital-gateway';
import { DEFAULT_PASSWORD } from '../../../shared/constants';
import { RegistrationEndPoints } from '../constants';
import { MobileGateway } from '@cigna/shared/webdriverio-util';
import { AxiosResponse } from 'axios';

@injectable()
export class RegistrationUtilImpl implements RegistrationUtil {
  private _authOUtil: Auth0Util;
  private _searchUserAPI: PersonRecordHubSearchAPI;
  private _digitalGateway: MobileGateway;

  constructor(
    @inject(SHARED_API_TYPES.Auth0Util) authOUtil: Auth0Util,
    @inject(REGISTRATION_TYPES.PersonRecordHubSearchAPI)
    searchUserAPI: PersonRecordHubSearchAPI,
    @inject(SHARED_API_TYPES.DigitalGateway)
    digitalGateway: DigitalGateway,
  ) {
    this._authOUtil = authOUtil;
    this._digitalGateway = digitalGateway;
    this._searchUserAPI = searchUserAPI;
  }

  getAuthOUtil(): Auth0Util {
    return this._authOUtil;
  }
  getPersonRecordHubAPI(): PersonRecordHubSearchAPI {
    return this._searchUserAPI;
  }
  async unregisterMember(resourceId: string): Promise<void> {
    const allActiveLoginId = await this._searchUserAPI
      .getDemographicFromResourceId(resourceId)
      .then((userDemographicDetails) => userDemographicDetails.activeLoginId);
    for await (const activeLoginId of allActiveLoginId) {
      await this._searchUserAPI.updateUserStatusByResourceId({
        resourceId,
        status: 'Inactive',
        profileId: activeLoginId,
      });

      await this._authOUtil.deleteUserByLoginId(activeLoginId);
    }
  }

  async unregisterMemberOnlyFromPersonRecordHub(
    resourceId: string,
  ): Promise<void> {
    const allActiveLoginId = await this._searchUserAPI
      .getDemographicFromResourceId(resourceId)
      .then((userDemographicDetails) => userDemographicDetails.activeLoginId);
    for await (const activeLoginId of allActiveLoginId) {
      await this._searchUserAPI.updateUserStatusByResourceId({
        resourceId,
        status: 'Inactive',
        profileId: activeLoginId,
      });
    }
  }

  async unregisterMemberAtAuth0AndPersonRecordHub(
    resourceId: string,
    activeLoginId: string,
  ): Promise<void> {
    await this._authOUtil.deleteUserByLoginId(activeLoginId);
    await this.unregisterMember(resourceId);
  }

  async validatePostRegistrationDetails(
    resourceIdToTest: string,
    email: string,
  ): Promise<void> {
    const userDetailsFromPersonResourceHub =
      await this._searchUserAPI.getDemographicFromResourceId(resourceIdToTest);
    const auth0UserDetails = await this._authOUtil.searchUserByLoginId(email);

    this.validateAuth0PersonEntityDetails(
      email,
      userDetailsFromPersonResourceHub,
      auth0UserDetails,
    );
  }

  private validateAuth0PersonEntityDetails(
    email: string,
    userDetailsFromPersonResourceHub: UserDemographicDetails,
    auth0UserDetails: Auth0SearchUserResponse[],
  ): void {
    expect(auth0UserDetails[0].email).toEqual(email);
    expect(auth0UserDetails[0].email_verified).toEqual(false);
    expect(auth0UserDetails[0].family_name).toEqual(
      userDetailsFromPersonResourceHub.lastName,
    );
    expect(auth0UserDetails[0].given_name).toEqual(
      userDetailsFromPersonResourceHub.firstName,
    );
    expect(auth0UserDetails[0].name).toEqual(
      `${userDetailsFromPersonResourceHub.firstName} ${userDetailsFromPersonResourceHub.lastName}`,
    );
    const stringArray: string[] =
      userDetailsFromPersonResourceHub.activeLoginId;
    const combinedString: string = stringArray.join(' ');
    expect(combinedString).toEqual(email);
  }

  async registerUserAPI(
    registerUserAPIRequest: RegisterUserAPIRequest,
  ): Promise<void> {
    const registerUserResponse = await this.callRegisterAPI(
      registerUserAPIRequest,
    );
    expect(registerUserResponse.data.registration_response_code).toBe(0);
  }

  private callRegisterAPI(
    registerUserAPIRequest: RegisterUserAPIRequest,
  ): Promise<AxiosResponse<RegisterUserAPIResponse>> {
    return this._digitalGateway.postPublicResponse(
      `${RegistrationEndPoints.RegisterUser}`,
      {
        firstName: registerUserAPIRequest.firstName,
        lastName: registerUserAPIRequest.lastName,
        birthDate: registerUserAPIRequest.birthDate,
        postalCode: registerUserAPIRequest.postalCode,
        ssn: registerUserAPIRequest.ssn,
        email: registerUserAPIRequest.email,
        password: registerUserAPIRequest.password || DEFAULT_PASSWORD,
        phone: registerUserAPIRequest.phone,
      },
    );
  }
}
