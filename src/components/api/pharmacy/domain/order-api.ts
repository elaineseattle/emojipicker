import { inject, injectable } from 'inversify';
import { OrderAPI } from '../interfaces';
import { OrderResponse } from '../model/order-api.response';
import { MobileGateway } from '@cigna/shared/webdriverio-util';
import { SHARED_API_TYPES } from '../../shared/shared.symbols';
import { DigitalGateway } from '../../shared/digital-gateway';
import { OrdersAPIEndPoints } from '../constants';

@injectable()
export class OrderAPIImpl implements OrderAPI {
  private _digitalGateway: MobileGateway;

  constructor(
    @inject(SHARED_API_TYPES.DigitalGateway)
    digitalGateway: DigitalGateway,
  ) {
    this._digitalGateway = digitalGateway;
  }

  async getAllOrders(limit: boolean): Promise<OrderResponse> {
    const orderResponse = await this._digitalGateway.getResponse<OrderResponse>(
      OrdersAPIEndPoints.Orders,
      {
        params: {
          limit,
          offset: 0,
        },
      },
    );
    expect(orderResponse.status).toEqual(200);
    return orderResponse.data;
  }
}
