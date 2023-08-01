import { injectable } from 'inversify';
import { TestUsers } from './test-users';
import { InsuranceProduct } from '../features/insurance/scenes/screen-insurance/constants';
import { NavigationMenu } from '../shared/constants';

@injectable()
export class DevTestUsers extends TestUsers {
  DEFAULT_PASSWORD = 'digitalqeintdata';

  getDefaultTestUser() {
    return {
      emailId: 'mycignawebqatest@cigna.com',
      insuranceTiles: [
        InsuranceProduct.Medical,
        InsuranceProduct.Dental,
        InsuranceProduct.Vision,
      ],
      navigation: [
        NavigationMenu.Home,
        NavigationMenu.Pharmacy,
        NavigationMenu.GetCare,
        NavigationMenu.Benefits,
        NavigationMenu.Insurance,
      ],
    };
  }
}
