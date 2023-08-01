import { inject, injectable } from 'inversify';
import { NavigationAPI } from '../interfaces';
import { NavigationApiResponse } from '../model/navigation-api.response';
import { MobileGateway } from '@cigna/shared/webdriverio-util';
import { SHARED_API_TYPES } from '../../shared/shared.symbols';
import { DigitalGateway } from '../../shared/digital-gateway';
import { NavigationAPIEndPoints } from '../constants';

@injectable()
export class NavigationAPIImpl implements NavigationAPI {
  private _digitalGateway: MobileGateway;

  constructor(
    @inject(SHARED_API_TYPES.DigitalGateway)
    digitalGateway: DigitalGateway,
  ) {
    this._digitalGateway = digitalGateway;
  }

  async getNavigationApiResponse(): Promise<NavigationApiResponse> {
    const navigationApiResponse =
      await this._digitalGateway.getResponse<NavigationApiResponse>(
        NavigationAPIEndPoints.Navigation,
      );
    expect(navigationApiResponse.status).toEqual(200);
    return navigationApiResponse.data;
  }
}
