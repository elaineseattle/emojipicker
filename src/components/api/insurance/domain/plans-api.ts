import { inject, injectable } from 'inversify';
import { PlansAPI } from '../interfaces';
import { PlansApiResponse } from '../model/plans-api.response';
import { MobileGateway } from '@cigna/shared/webdriverio-util';
import { SHARED_API_TYPES } from '../../shared/shared.symbols';
import { DigitalGateway } from '../../shared/digital-gateway';
import { InsuranceAPIEndPoints } from '../constants';

@injectable()
export class PlansAPIImpl implements PlansAPI {
  private _digitalGateway: MobileGateway;

  constructor(
    @inject(SHARED_API_TYPES.DigitalGateway)
    digitalGateway: DigitalGateway,
  ) {
    this._digitalGateway = digitalGateway;
  }

  async getPlanDetails(): Promise<PlansApiResponse> {
    const planAPIResponse =
      await this._digitalGateway.getResponse<PlansApiResponse>(
        InsuranceAPIEndPoints.Plans,
      );
    expect(planAPIResponse.status).toEqual(200);
    return planAPIResponse.data;
  }
}
