import { container } from '../../support/inversify.config';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import { DeepLink } from '../../support/features/shared/shared.interfaces';
import { TestUsers } from '../../support/test-users/test-users';
import { TEST_USERS_TYPES } from '../../support/test-users/test-users.symbols';
import { DashboardScreen } from '../../support/features/dashboard/scenes/screen-dashboard';
import { DASHBOARD_TYPES } from '../../support/features/dashboard/dashboard.symbol';
import { NavigationMenu } from '../../support/shared/constants';

describe('Validating the Navigation flow of the app', () => {
  let deepLink: DeepLink;
  let testUser: TestUsers;
  let dashboardScreen: DashboardScreen;
  before(() => {
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    testUser = container.get<TestUsers>(TEST_USERS_TYPES.TestUsers);
    dashboardScreen = container.get(DASHBOARD_TYPES.DashboardScreen);
  });
  it('E2E Login Flow', async () => {
    await deepLink.deeplinkLogin(
      {
        username: testUser.getDefaultTestUser().emailId,
      },
      {
        screenName: NavigationMenu.Home,
      },
    );
  });
  it('Validate the app is navigating to all pages', async () => {
    expect(await dashboardScreen.waitForScreenToLoad()).toBe(true);
    await dashboardScreen.validateNavigationBar();
    await dashboardScreen.validateNavigationMenu(
      testUser.getDefaultTestUser().navigation,
    );
  });
});
