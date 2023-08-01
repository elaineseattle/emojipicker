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
import { InformationScreen } from '../../support/features/information/scenes/information-screen';
import { INFORMATION_TYPES } from '../../support/features/information/information.symbol';
import { DeepLink } from '../../support/features/shared/shared.interfaces';

describe('Create Account Screen Validation', () => {
  let searchScreen: SearchUserScreen;
  let deepLink: DeepLink;
  let personRecordHubSearchAPI: PersonRecordHubSearchAPI;
  let verifyIdentityScreen: VerifyIdentityScreen;
  let createAccountScreen: CreateAccountScreen;
  let registrationUtil: RegistrationUtil;
  let createPasswordScreen: CreatePasswordScreen;
  let infoScreen: InformationScreen;

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
    createPasswordScreen = container.get(
      REGISTRATION_TYPES.CreatePasswordScreen,
    );
    infoScreen = container.get(INFORMATION_TYPES.InformationScreen);
  });

  beforeEach(async () => {
    const resourceIdToTest = 'cf6f5483-a809-467e-ae6b-f4f2fa5d397f';
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
  });

  afterEach(async () => {
    await searchScreen.terminateAndLaunchApp();
  });

  it('Validate Create Account Screen Field Validation', async () => {
    await createAccountScreen.validatePlaceHolderText();
    await createAccountScreen.validatePageContents();
    await createAccountScreen.validateCreateAccountFieldValidations();
    const resourceIdToTest = 'cf6f5483-a809-467e-ae6b-f4f2fa5d397f';
    const emailId = `${resourceIdToTest.slice(0, 6)}@cigna.com`;
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      resourceIdToTest,
      emailId,
    );
  });

  it('Validate Create Account Screen With Mixed case emails and infoIcon', async () => {
    await createAccountScreen.tapHeaderInfoIcon();
    await infoScreen.waitForScreenToLoad();
    await infoScreen.validatePageContents();
    await infoScreen.tapBackButton();
    await createAccountScreen.waitForScreenToLoad();
    await createAccountScreen.validateMixedCaseEmails();
    await createPasswordScreen.waitForScreenToLoad();
    await createPasswordScreen.validatePageContents();
    const resourceIdToTest = 'cf6f5483-a809-467e-ae6b-f4f2fa5d397f';
    const emailId = `${resourceIdToTest.slice(0, 6)}@cigna.com`;
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      resourceIdToTest,
      emailId,
    );
  });

  // TODO: EverNorth logo,info icon test ids should be same as onBoarding.
  // TODO: Swipe action need to be added left to right
  // TODO: Field level validations should be covered.(max chars,special char check..etc)
});
