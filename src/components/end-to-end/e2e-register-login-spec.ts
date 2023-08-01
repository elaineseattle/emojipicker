import { SearchUserScreen } from '../../support/features/registration/search-user/search-user.screen';
import { container } from '../../support/inversify.config';
import { REGISTRATION_TYPES } from '../../support/features/registration/registration.symbols';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import { RegistrationUtil } from '../../support/api/registration/interfaces';
import { VerifyIdentityScreen } from '../../support/features/registration/verify-indentity/verify-identity.screen';
import { CreateAccountScreen } from '../../support/features/registration/create-account/create-account.screen';
import { CreatePasswordScreen } from '../../support/features/registration/create-password/create-password.screen';
import { ThanksForCreatedAccountScreen } from '../../support/features/registration/thanks-screen/thanks-for-created-account.screen';
import { LoginScreen } from '../../support/features/login/scenes/screen-login';
import { DashboardScreen } from '../../support/features/dashboard/scenes/screen-dashboard';
import { LOGIN_TYPES } from '../../support/features/login/login.symbol';
import { DASHBOARD_TYPES } from '../../support/features/dashboard/dashboard.symbol';
import { DeepLink } from '../../support/features/shared/shared.interfaces';

describe('Validate E2E Register Screen', () => {
  let searchScreen: SearchUserScreen;
  let verifyIdentityScreen: VerifyIdentityScreen;
  let createAccountScreen: CreateAccountScreen;
  let createPasswordScreen: CreatePasswordScreen;
  let thanksScreen: ThanksForCreatedAccountScreen;

  let registrationUtil: RegistrationUtil;
  let loginScreen: LoginScreen;
  let dashboardScreen: DashboardScreen;

  let deepLink: DeepLink;

  before(() => {
    searchScreen = container.get(REGISTRATION_TYPES.SearchUser);
    verifyIdentityScreen = container.get(
      REGISTRATION_TYPES.VerifyIdentityScreen,
    );

    createAccountScreen = container.get(REGISTRATION_TYPES.CreateAccountScreen);
    registrationUtil = container.get(REGISTRATION_TYPES.RegistrationUtil);

    createPasswordScreen = container.get(
      REGISTRATION_TYPES.CreatePasswordScreen,
    );

    thanksScreen = container.get(
      REGISTRATION_TYPES.ThanksForCreatedAccountScreen,
    );
    loginScreen = container.get(LOGIN_TYPES.LoginScreen);
    dashboardScreen = container.get(DASHBOARD_TYPES.DashboardScreen);

    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
  });

  it('Registration', async () => {
    const resourceIdToTest = 'c21ec3e4-7c2a-4b17-ad7e-03718d718631';
    const email = `${resourceIdToTest.slice(0, 6)}@cigna.com`;
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      resourceIdToTest,
      email,
    );
    const personDetailsFromEntity = await registrationUtil
      .getPersonRecordHubAPI()
      .getDemographicFromResourceId(resourceIdToTest);

    await deepLink.navigateRegister();
    await searchScreen.waitForScreenToLoad();
    await searchScreen.fillSearchUserScreenAndClickNext({
      firstName: personDetailsFromEntity.firstName,
      lastName: personDetailsFromEntity.lastName,
      dob: personDetailsFromEntity.birthDate,
      zipCode: '81120',
    });
    await verifyIdentityScreen.waitForScreenToLoad();
    await verifyIdentityScreen.fillVerifyIdentityScreenAndClickNext(
      personDetailsFromEntity.ssn,
    );
    await createAccountScreen.waitForScreenToLoad();
    await createAccountScreen.fillCreateAccountScreenAndClickNext(email);

    await createPasswordScreen.waitForScreenToLoad();
    await createPasswordScreen.fillCreatePasswordScreen();
    await thanksScreen.waitForScreenToLoad();
    await expect(thanksScreen.getContinueToLoginButton()).toBeDisplayed();

    await registrationUtil.validatePostRegistrationDetails(
      resourceIdToTest,
      email,
    );

    await registrationUtil.getAuthOUtil().addUserToPhoneAuthentication(email);
    await registrationUtil.getAuthOUtil().addUserToByPassMFARole(email);

    await thanksScreen.waitForScreenToLoad();
    await thanksScreen.tapContinueButton();

    await deepLink.handleAuth0Alert();

    await loginScreen.login(email);
    await dashboardScreen.waitForScreenToLoad();
    await dashboardScreen.validateWelcomeText();

    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      resourceIdToTest,
      email,
    );
  });
});
