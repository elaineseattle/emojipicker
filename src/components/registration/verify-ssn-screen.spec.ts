import { SearchUserScreen } from '../../support/features/registration/search-user/search-user.screen';
import { container } from '../../support/inversify.config';
import { REGISTRATION_TYPES } from '../../support/features/registration/registration.symbols';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import {
  PersonRecordHubSearchAPI,
  RegistrationUtil,
} from '../../support/api/registration/interfaces';
import { VerifyIdentityScreen } from '../../support/features/registration/verify-indentity/verify-identity.screen';
import { DeepLink } from '../../support/features/shared/shared.interfaces';

describe('SSN Screen Validation', () => {
  let searchScreen: SearchUserScreen;

  let personRecordHubSearchAPI: PersonRecordHubSearchAPI;
  let verifyIdentityScreen: VerifyIdentityScreen;
  let registrationUtil: RegistrationUtil;
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

    registrationUtil = container.get(REGISTRATION_TYPES.RegistrationUtil);
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
    await registrationUtil.registerUserAPI({
      firstName: personDetailsFromEntity.firstName,
      lastName: personDetailsFromEntity.lastName,
      birthDate: '1973-02-01',
      postalCode: '81120',
      ssn: '7295',
      email: emailId,
    });
    await deepLink.navigateRegister();
    await searchScreen.waitForScreenToLoad();
    await searchScreen.fillSearchUserScreenAndClickNext({
      firstName: personDetailsFromEntity.firstName,
      lastName: personDetailsFromEntity.lastName,
      dob: personDetailsFromEntity.birthDate,
      zipCode: '81120',
    });
    await verifyIdentityScreen.waitForScreenToLoad();
  });

  afterEach(async () => {
    await searchScreen.terminateAndLaunchApp();
  });

  it('Validate SSN Field Validations', async () => {
    await verifyIdentityScreen.validateConfirmIdentityPercentage();
    await verifyIdentityScreen.verifyEnter4DigitsText();
    await verifyIdentityScreen.fillVerifyIdentityScreenAndClickNext('');
    await verifyIdentityScreen.verifyFourDigitsSSNRequiredText();
    await verifyIdentityScreen.fillVerifyIdentityScreenAndClickNext('12');
    await verifyIdentityScreen.verifyFourDigitsSSNRequiredText();
    await verifyIdentityScreen.fillVerifyIdentityScreenAndClickNext('1234');
    await verifyIdentityScreen.verifyInvalidSSNText();
    await verifyIdentityScreen.verifyCrisisNumbersLink(false);
  });

  it('Validate SSN Screen with already registered user', async () => {
    await verifyIdentityScreen.fillVerifyIdentityScreenAndClickNext('7295');
    await verifyIdentityScreen.verifyAlreadyRegisteredUser();

    // TODO: Registration api need to handle this.
    // TODO: Back navigation needs to be added with swipe left to right.
    // TODO: User is not an Evernorth navigation user once defect is fixed.
    // TODO: Field level validations should be covered.(max chars,special char check..etc)
  });
});
