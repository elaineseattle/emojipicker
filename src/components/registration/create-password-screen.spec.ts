import { SearchUserScreen } from '../../support/features/registration/search-user/search-user.screen';
import { container } from '../../support/inversify.config';
import { REGISTRATION_TYPES } from '../../support/features/registration/registration.symbols';
import { OnBoardingScreen } from '../../support/features/shared/on-boarding.screen';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import {
  PersonRecordHubSearchAPI,
  RegistrationUtil,
} from '../../support/api/registration/interfaces';
import { VerifyIdentityScreen } from '../../support/features/registration/verify-indentity/verify-identity.screen';
import { CreateAccountScreen } from '../../support/features/registration/create-account/create-account.screen';
import { CreatePasswordScreen } from '../../support/features/registration/create-password/create-password.screen';
import { ThanksForCreatedAccountScreen } from '../../support/features/registration/thanks-screen/thanks-for-created-account.screen';
import { DeepLink } from '../../support/features/shared/shared.interfaces';
import { LoginScreen } from '../../support/features/login/scenes/screen-login';
import { DashboardScreen } from '../../support/features/dashboard/scenes/screen-dashboard';
import { LOGIN_TYPES } from '../../support/features/login/login.symbol';
import { DASHBOARD_TYPES } from '../../support/features/dashboard/dashboard.symbol';

describe('Create Password Screen Validation', () => {
  let searchScreen: SearchUserScreen;
  let onBoardingScreen: OnBoardingScreen;
  let personRecordHubSearchAPI: PersonRecordHubSearchAPI;
  let verifyIdentityScreen: VerifyIdentityScreen;
  let createAccountScreen: CreateAccountScreen;
  let registrationUtil: RegistrationUtil;
  let createPasswordScreen: CreatePasswordScreen;
  let thanksScreen: ThanksForCreatedAccountScreen;
  let deepLink: DeepLink;
  let loginScreen: LoginScreen;
  let dashboardScreen: DashboardScreen;

  before(() => {
    createAccountScreen = container.get(REGISTRATION_TYPES.CreateAccountScreen);
    searchScreen = container.get(REGISTRATION_TYPES.SearchUser);
    verifyIdentityScreen = container.get(
      REGISTRATION_TYPES.VerifyIdentityScreen,
    );
    onBoardingScreen = container.get(SHARED_TYPES.OnBoardingScreen);
    personRecordHubSearchAPI = container.get(
      REGISTRATION_TYPES.PersonRecordHubSearchAPI,
    );
    createPasswordScreen = container.get(
      REGISTRATION_TYPES.CreatePasswordScreen,
    );
    registrationUtil = container.get(REGISTRATION_TYPES.RegistrationUtil);
    thanksScreen = container.get(
      REGISTRATION_TYPES.ThanksForCreatedAccountScreen,
    );
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    loginScreen = container.get(LOGIN_TYPES.LoginScreen);
    dashboardScreen = container.get(DASHBOARD_TYPES.DashboardScreen);
  });

  it('Validate Create Password Screen Field Validation and Success,Login Validation from OnBoarding flow', async () => {
    const resourceIdToTest = 'cf6f5483-a809-467e-ae6b-f4f2fa5d397f';
    const email = `${resourceIdToTest.slice(0, 6)}@cigna.com`;
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      resourceIdToTest,
      email,
    );
    const personDetailsFromEntity =
      await personRecordHubSearchAPI.getDemographicFromResourceId(
        resourceIdToTest,
      );

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
    await createPasswordScreen.validatePageContents();
    await createPasswordScreen.tapContinueButton();
    await createPasswordScreen.waitForScreenToLoad();
    await createPasswordScreen.validateRequiredFields();
    await createPasswordScreen.validatePasswordContents();
    await createPasswordScreen.tapContinueButton();
    await thanksScreen.waitForScreenToLoad();
    await expect(thanksScreen.getContinueToLoginButton()).toBeDisplayed();
    await thanksScreen.validatePageContents();
    await registrationUtil.validatePostRegistrationDetails(
      resourceIdToTest,
      email,
    );
    await registrationUtil.getAuthOUtil().addUserToPhoneAuthentication(email);
    await registrationUtil.getAuthOUtil().addUserToByPassMFARole(email);
    await thanksScreen.waitForScreenToLoad();
    await thanksScreen.terminateAndLaunchApp();
    await deepLink.navigateLogin();
    await loginScreen.login(email);
    await dashboardScreen.waitForScreenToLoad();
    await dashboardScreen.validateWelcomeText();

    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      resourceIdToTest,
      email,
    );
  });

  // TODO: Evernorth logo, tick mark, checkbox icon, eye icon
  // TODO: After successful registration, if we navigate back, user should land directly to onboarding screen.
  // TODO: Field level validations should be covered.(max chars,special char check..etc)
  // TODO: Swipe action left to right.
});
