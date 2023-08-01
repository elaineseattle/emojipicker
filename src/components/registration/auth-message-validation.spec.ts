import { SearchUserScreen } from '../../support/features/registration/search-user/search-user.screen';
import { container } from '../../support/inversify.config';
import { REGISTRATION_TYPES } from '../../support/features/registration/registration.symbols';
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
import { InformationScreen } from '../../support/features/information/scenes/information-screen';
import { INFORMATION_TYPES } from '../../support/features/information/information.symbol';

describe('Create Password Screen Validation', () => {
  let searchScreen: SearchUserScreen;
  let deepLink: DeepLink;
  let personRecordHubSearchAPI: PersonRecordHubSearchAPI;
  let verifyIdentityScreen: VerifyIdentityScreen;
  let createAccountScreen: CreateAccountScreen;
  let registrationUtil: RegistrationUtil;
  let createPasswordScreen: CreatePasswordScreen;
  let thanksScreen: ThanksForCreatedAccountScreen;
  let loginScreen: LoginScreen;
  let dashboardScreen: DashboardScreen;
  let infoScreen: InformationScreen;

  before(() => {
    createAccountScreen = container.get(REGISTRATION_TYPES.CreateAccountScreen);
    searchScreen = container.get(REGISTRATION_TYPES.SearchUser);
    verifyIdentityScreen = container.get(
      REGISTRATION_TYPES.VerifyIdentityScreen,
    );
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);

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
    infoScreen = container.get(INFORMATION_TYPES.InformationScreen);
  });

  it('Auth Zero Error Message and Info Screen Validation in Password Screen', async () => {
    const resourceIdToTest = '6c31980f-79bd-4676-8ec2-34d43f24f22b';
    const emailId = `${resourceIdToTest.slice(0, 6)}@cigna.com`;
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      resourceIdToTest,
      emailId,
    );
    const personDetailsFromEntity =
      await personRecordHubSearchAPI.getDemographicFromResourceId(
        resourceIdToTest,
      );
    await registrationUtil.registerUserAPI({
      firstName: personDetailsFromEntity.firstName,
      lastName: personDetailsFromEntity.lastName,
      birthDate: '2000-03-01',
      postalCode: '81120',
      ssn: '3765',
      email: emailId,
    });
    await registrationUtil.unregisterMemberOnlyFromPersonRecordHub(
      resourceIdToTest,
    );
    await deepLink.navigateRegister();
    await searchScreen.waitForScreenToLoad();
    await searchScreen.validateLabelAndPlaceHolderText();
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
    await createAccountScreen.fillCreateAccountScreenAndClickNext(emailId);
    await createPasswordScreen.waitForScreenToLoad();
    await createPasswordScreen.tapHeaderInfoIcon();
    await infoScreen.waitForScreenToLoad();
    await infoScreen.validatePageContents();
    await infoScreen.tapBackButton();
    await createPasswordScreen.waitForScreenToLoad();
    await createPasswordScreen.fillCreatePasswordScreen();
    await createPasswordScreen.validateAuth0ErrorMessage();
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      resourceIdToTest,
      emailId,
    );
  });
});
