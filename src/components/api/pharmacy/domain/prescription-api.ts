import { inject, injectable } from 'inversify';
import { PrescriptionAPI } from '../interfaces';
import { PrescriptionApiResponse } from '../model/prescription-api.response';
import { MobileGateway } from '@cigna/shared/webdriverio-util';
import { SHARED_API_TYPES } from '../../shared/shared.symbols';
import { DigitalGateway } from '../../shared/digital-gateway';
import { PharmacyAPIEndPoints } from '../constants';

@injectable()
export class PrescriptionAPIImpl implements PrescriptionAPI {
  private _digitalGateway: MobileGateway;

  constructor(
    @inject(SHARED_API_TYPES.DigitalGateway)
    digitalGateway: DigitalGateway,
  ) {
    this._digitalGateway = digitalGateway;
  }

  async getAllPrescription(limit: boolean): Promise<PrescriptionApiResponse> {
    const prescriptionAPIResponse =
      await this._digitalGateway.getResponse<PrescriptionApiResponse>(
        PharmacyAPIEndPoints.Prescription,
        {
          params: {
            limit,
            offset: 0,
          },
        },
      );
    expect(prescriptionAPIResponse.status).toEqual(200);
    return prescriptionAPIResponse.data;
  }
}
