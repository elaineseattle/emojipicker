import { injectable } from 'inversify';
import { InsuranceProduct } from '../features/insurance/scenes/screen-insurance/constants';
import { NavigationMenu } from '../shared/constants';

export interface TestUser {
  emailId: string;
  password?: string;
  insuranceTiles?: InsuranceProduct[];
  navigation?: NavigationMenu[];
}

@injectable()
export abstract class TestUsers {
  abstract DEFAULT_PASSWORD: string;
  /**
   * Returns a generic Test User that is suitable for most
   * testing applications
   */
  abstract getDefaultTestUser(): TestUser;
}
