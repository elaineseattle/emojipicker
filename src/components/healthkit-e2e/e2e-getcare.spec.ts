import { container } from '../../support/inversify.config';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import { DeepLink } from '../../support/features/shared/shared.interfaces';
import { TestUsers } from '../../support/test-users/test-users';
import { TEST_USERS_TYPES } from '../../support/test-users/test-users.symbols';
import { GetCareScreen } from '../../support/features/get-care/scenes/screen-get-care';
import { GETCARE_TYPES } from '../../support/features/get-care/get-care.symbol';
import { NavigationMenu } from '../../support/shared/constants';
describe('Validate Get Care Screen', () => {
  let deepLink: DeepLink;
  let testUser: TestUsers;
  let getCareScreen: GetCareScreen;
  before(() => {
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    testUser = container.get<TestUsers>(TEST_USERS_TYPES.TestUsers);
    getCareScreen = container.get(GETCARE_TYPES.GetCareScreen);
  });
  it('E2E Login Flow', async () => {
    await deepLink.deeplinkLogin(
      {
        username: testUser.getDefaultTestUser().emailId,
      },
      {
        screenName: NavigationMenu.GetCare,
      },
    );
  });

  it('Get Care Page Validation', async () => {
    expect(await getCareScreen.waitForScreenToLoad()).toBe(true);
    await getCareScreen.validateGetCareHeader();
    await getCareScreen.validateCareOptionsCard();
    await getCareScreen.validateGuidanceOptionsCard();
    await getCareScreen.validateEmergencyOptionsCard();
  });
});
