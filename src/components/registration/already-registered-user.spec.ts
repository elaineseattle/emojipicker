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
import { LoginScreen } from '../../support/features/login/scenes/screen-login';
import { LOGIN_TYPES } from '../../support/features/login/login.symbol';
import { AlertComponent } from '@cigna/shared/webdriverio-util';
import { TextInputBox } from '../../support/features/login/scenes/screen-login/constants';
import { CreatePasswordScreen } from '../../support/features/registration/create-password/create-password.screen';
import { DeepLink } from '../../support/features/shared/shared.interfaces';

describe('Create Account Screen With Already Registered User', () => {
  let searchScreen: SearchUserScreen;
  let personRecordHubSearchAPI: PersonRecordHubSearchAPI;
  let verifyIdentityScreen: VerifyIdentityScreen;
  let createAccountScreen: CreateAccountScreen;
  let registrationUtil: RegistrationUtil;
  let loginScreen: LoginScreen;
  let alertComponent: AlertComponent;
  let createPasswordScreen: CreatePasswordScreen;
  let deepLink: DeepLink;

  before(() => {
    searchScreen = container.get(REGISTRATION_TYPES.SearchUser);
    verifyIdentityScreen = container.get(
      REGISTRATION_TYPES.VerifyIdentityScreen,
    );
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    personRecordHubSearchAPI = container.get(
      REGISTRATION_TYPES.PersonRecordHubSearchAPI,
    );
    createAccountScreen = container.get(REGISTRATION_TYPES.CreateAccountScreen);
    registrationUtil = container.get(REGISTRATION_TYPES.RegistrationUtil);
    loginScreen = container.get(LOGIN_TYPES.LoginScreen);
    alertComponent = container.get(SHARED_TYPES.AlertComponent);
    createPasswordScreen = container.get(
      REGISTRATION_TYPES.CreatePasswordScreen,
    );
  });

  it('Validate Create Account Screen With Already Registered User', async () => {
    const alreadyRegisteredResourceId = 'a28a2384-faf0-42ed-8401-df2137e4a370';
    const arEmail = `${alreadyRegisteredResourceId.slice(0, 6)}@cigna.com`;
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      alreadyRegisteredResourceId,
      arEmail,
    );
    const alreadyRegisteredPersonDetailsFromEntity =
      await personRecordHubSearchAPI.getDemographicFromResourceId(
        alreadyRegisteredResourceId,
      );
    await registrationUtil.registerUserAPI({
      firstName: alreadyRegisteredPersonDetailsFromEntity.firstName,
      lastName: alreadyRegisteredPersonDetailsFromEntity.lastName,
      birthDate: '1998-02-01',
      postalCode: '81120',
      ssn: '9430',
      email: arEmail,
    });
    const resourceIdToTest = 'c21ec3e4-7c2a-4b17-ad7e-03718d718631';
    const emailId = `${resourceIdToTest.slice(0, 6)}@cigna.com`;
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      resourceIdToTest,
      emailId,
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
    await createAccountScreen.fillCreateAccountScreenAndClickNext(arEmail);
    await createAccountScreen.waitForScreenToLoad();
    await createAccountScreen.validateAlreadyRegisteredUserContent();
    await createAccountScreen.waitForScreenToLoad();
    await createAccountScreen.tapGoToLoginInsteadLink();
    if (driver.isIOS) {
      await alertComponent.waitForAlertDisplayed();
      await alertComponent.acceptAlert();
    }
    await loginScreen.waitForScreenToLoad();
    await expect(
      loginScreen.getInputBoxOfScreen(TextInputBox.Username),
    ).toBeDisplayed();
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      alreadyRegisteredResourceId,
      arEmail,
    );
  });
});
