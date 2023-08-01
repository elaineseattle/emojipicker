import { PersonRecordHubSearchAPI } from '../interfaces';
import { inject, injectable } from 'inversify';
import {
  AddressType,
  SearchPersonsResponse,
  UpdateKeyRingRequest,
  UpdateKeyRingRequestToPass,
} from '../model/search-persons-response.model';
import { SHARED_API_TYPES } from '../../shared/shared.symbols';
import { PersonRecordHubGateway } from '../../shared/person-record-hub.gateway';
import { UserDemographicDetails } from '../model/demographic-details.model';
import dayjs from 'dayjs';
import { UpdatePersonRecordHubResponseData } from '../model/update-person-entity.model';

@injectable()
export class PersonRecordHubSearchAPIImpl implements PersonRecordHubSearchAPI {
  private _personRecordHubGateway: PersonRecordHubGateway;

  constructor(
    @inject(SHARED_API_TYPES.PersonRecordHubGateway)
    personRecordHubGateway: PersonRecordHubGateway,
  ) {
    this._personRecordHubGateway = personRecordHubGateway;
  }

  async searchPersonByResourceId(
    resourceId: string,
  ): Promise<SearchPersonsResponse> {
    const responseFromSearchPerson =
      await this._personRecordHubGateway.getResponse<SearchPersonsResponse>(
        `/v2/persons/${resourceId}`,
      );
    return responseFromSearchPerson.data;
  }

  getDemographicFromResourceId(
    resourceId: string,
  ): Promise<UserDemographicDetails> {
    return this.searchPersonByResourceId(resourceId).then((response) => ({
      firstName: response.name.first,
      lastName: response.name.last,
      birthDate: dayjs(response.birthDate, 'YYYY-MM-DD'),
      postalCode:
        response.postalAddresses
          ?.find(
            (postalAddress) => postalAddress.addressType === AddressType.HOME,
          )
          ?.postalCode.substring(0, 5) ?? '',
      ssn: response.ssn ? response.ssn.substring(7) : '',
      resourceId: response.resourceId,
      activeLoginId:
        response.keyRing
          ?.filter(
            (keyRing) =>
              keyRing.idType === 'EvernorthDigitalLoginId' &&
              keyRing.status.value === 'Active',
          )
          .map((keyRing) => keyRing.profileId) ?? [],
    }));
  }

  updateUserStatusByResourceId(
    updateKeyRingRequest: UpdateKeyRingRequest,
  ): Promise<UpdatePersonRecordHubResponseData> {
    return this._personRecordHubGateway
      .putResponse<
        UpdatePersonRecordHubResponseData,
        UpdateKeyRingRequestToPass
      >(
        `/v2/persons/${updateKeyRingRequest.resourceId}`,
        {
          keyRing: [
            {
              idType: 'EvernorthDigitalLoginId',
              profileId: updateKeyRingRequest.profileId,
              status: {
                value: updateKeyRingRequest.status,
              },
            },
          ],
        },
        {
          headers: {
            securityContext_tenantId: 1,
          },
        },
      )
      .then((response) => response);
  }
}
