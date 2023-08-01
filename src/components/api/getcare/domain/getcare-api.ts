import { inject, injectable } from 'inversify';
import { GetCareAPI } from '../interfaces';
import { GetCareApiResponse } from '../model/getcare-api.response';
import { MobileGateway } from '@cigna/shared/webdriverio-util';
import { SHARED_API_TYPES } from '../../shared/shared.symbols';
import { DigitalGateway } from '../../shared/digital-gateway';
import { GetCareAPIEndPoints } from '../constants';

@injectable()
export class GetCareAPIImpl implements GetCareAPI {
  private _digitalGateway: MobileGateway;

  constructor(
    @inject(SHARED_API_TYPES.DigitalGateway)
    digitalGateway: DigitalGateway,
  ) {
    this._digitalGateway = digitalGateway;
  }

  async getGetCareApiResponse(): Promise<GetCareApiResponse> {
    const getCareApiResponse =
      await this._digitalGateway.getResponse<GetCareApiResponse>(
        GetCareAPIEndPoints.GetCare,
      );
    expect(getCareApiResponse.status).toEqual(200);
    return getCareApiResponse.data;
  }
}
