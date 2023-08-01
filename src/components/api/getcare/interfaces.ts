import { GetCareApiResponse } from './model/getcare-api.response';

export interface GetCareAPI {
  getGetCareApiResponse(): Promise<GetCareApiResponse>;
}
