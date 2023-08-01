import {
  SearchPersonsResponse,
  UpdateKeyRingRequest,
} from './model/search-persons-response.model';
import { UserDemographicDetails } from './model/demographic-details.model';
import { UpdatePersonRecordHubResponseData } from './model/update-person-entity.model';
import { Auth0SearchUserResponse } from './model/auth0-search-user.response';
import { RegisterUserAPIRequest } from './model/register-user-response.model';

export interface PersonRecordHubSearchAPI {
  searchPersonByResourceId(resourceId: string): Promise<SearchPersonsResponse>;

  getDemographicFromResourceId(
    resourceId: string,
  ): Promise<UserDemographicDetails>;

  updateUserStatusByResourceId(
    updateKeyRingRequest: UpdateKeyRingRequest,
  ): Promise<UpdatePersonRecordHubResponseData>;
}

export interface RegistrationUtil {
  unregisterMember(resourceId: string): void;
  unregisterMemberOnlyFromPersonRecordHub(resourceId: string): void;
  unregisterMemberAtAuth0AndPersonRecordHub(
    resourceId: string,
    activeLoginId: string,
  ): Promise<void>;
  getAuthOUtil(): Auth0Util;

  getPersonRecordHubAPI(): PersonRecordHubSearchAPI;

  registerUserAPI(
    registerUserAPIRequest: RegisterUserAPIRequest,
  ): Promise<void>;

  validatePostRegistrationDetails(
    resourceIdToTest: string,
    email: string,
  ): Promise<void>;
}

export interface Auth0Util {
  searchUserByLoginId(loginId: string): Promise<Auth0SearchUserResponse[]>;
  deleteUserByAuth0Id(auth0Id: string): void;
  deleteUserByLoginId(loginId: string): void;
  searchAllUsers(): Promise<Auth0SearchUserResponse[]>;
  addUserToByPassMFARole(loginId: string): Promise<void>;
  addUserToPhoneAuthentication(loginId: string): Promise<void>;
}
