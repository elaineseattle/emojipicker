import { SearchUserScreen } from '../../support/features/registration/search-user/search-user.screen';
import { container } from '../../support/inversify.config';
import { REGISTRATION_TYPES } from '../../support/features/registration/registration.symbols';
import { OnBoardingScreen } from '../../support/features/shared/on-boarding.screen';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import { PersonRecordHubSearchAPI } from '../../support/api/registration/interfaces';
import dayjs from 'dayjs';
import { DeepLink } from '../../support/features/shared/shared.interfaces';

describe('Search User Screen and Error Contents', () => {
  let searchScreen: SearchUserScreen;
  let onBoardingScreen: OnBoardingScreen;
  let personRecordHubSearchAPI: PersonRecordHubSearchAPI;
  let deepLink: DeepLink;

  before(() => {
    searchScreen = container.get(REGISTRATION_TYPES.SearchUser);
    onBoardingScreen = container.get(SHARED_TYPES.OnBoardingScreen);
    personRecordHubSearchAPI = container.get(
      REGISTRATION_TYPES.PersonRecordHubSearchAPI,
    );
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
  });

  afterEach(async () => {
    await searchScreen.terminateAndLaunchApp();
  });

  it('Search User Page Contents', async () => {
    await deepLink.navigateRegister();
    await searchScreen.waitForScreenToLoad();
    await searchScreen.validateLabelAndPlaceHolderText();
    await searchScreen.validateBasicInfoPageContents();
  });

  it('Search User Error Contents', async () => {
    const resourceIdToTest = '9884fbc4-818d-4629-b2bc-1934eb97c00d';
    const personDetailsFromEntity =
      await personRecordHubSearchAPI.getDemographicFromResourceId(
        resourceIdToTest,
      );
    await deepLink.navigateRegister();
    await searchScreen.waitForScreenToLoad();
    await searchScreen.getNextButton().click();
    await searchScreen.validateRequiredFields();
    await searchScreen.fillSearchUserScreenAndClickNext({
      firstName: personDetailsFromEntity.firstName,
      lastName: personDetailsFromEntity.lastName,
      dob: dayjs('2023-02-01'),
      zipCode: '3844',
    });
    await searchScreen.validateInvalidZipCodeText(true);
    await searchScreen.validateAgeContent(true);
  });

  // TODO: Field level validations should be covered.(max chars,special char check..etc)
});
