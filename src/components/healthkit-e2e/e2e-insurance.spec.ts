import { container } from '../../support/inversify.config';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import { DeepLink } from '../../support/features/shared/shared.interfaces';
import { TestUsers } from '../../support/test-users/test-users';
import { TEST_USERS_TYPES } from '../../support/test-users/test-users.symbols';
import { NavigationMenu } from '../../support/shared/constants';
import { INSURANCE_TYPES } from '../../support/features/insurance/insurance.symbol';
import { InsuranceScreen } from '../../support/features/insurance/scenes/screen-insurance';
describe('Validate Insurance Screen', () => {
  let deepLink: DeepLink;
  let testUser: TestUsers;
  let insuranceScreen: InsuranceScreen;
  before(() => {
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    testUser = container.get<TestUsers>(TEST_USERS_TYPES.TestUsers);
    insuranceScreen = container.get(INSURANCE_TYPES.InsuranceScreen);
  });
  it('E2E Login Flow', async () => {
    await deepLink.deeplinkLogin(
      {
        username: testUser.getDefaultTestUser().emailId,
      },
      {
        screenName: NavigationMenu.Insurance,
      },
    );
  });
  it('Insurance Page Validation', async () => {
    expect(await insuranceScreen.waitForScreenToLoad()).toBe(true);
    await insuranceScreen.validatePageTitle();
    await insuranceScreen.validateLobCardContent(
      testUser.getDefaultTestUser().insuranceTiles,
    );
  });
});
