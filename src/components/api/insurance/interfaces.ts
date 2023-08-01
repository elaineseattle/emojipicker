import { PlansApiResponse } from './model/plans-api.response';

export interface PlansAPI {
  getPlanDetails(): Promise<PlansApiResponse>;
}
