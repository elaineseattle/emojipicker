import { SearchUserScreen } from '../../support/features/registration/search-user/search-user.screen';
import { container } from '../../support/inversify.config';
import { REGISTRATION_TYPES } from '../../support/features/registration/registration.symbols';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import { PersonRecordHubSearchAPI } from '../../support/api/registration/interfaces';
import { UserNotFoundScreen } from '../../support/features/registration/user-not-found-screen/user-not-found.screen';
import { LetsDoubleCheckScreen } from '../../support/features/registration/lets-double-check-screen/lets-double-check.screen';
import { DeepLink } from '../../support/features/shared/shared.interfaces';

describe('User Not Found Screen Validation', () => {
  let searchScreen: SearchUserScreen;
  let deepLink: DeepLink;
  let personRecordHubSearchAPI: PersonRecordHubSearchAPI;
  let userNotFoundScreen: UserNotFoundScreen;
  let letsDoubleCheckScreen: LetsDoubleCheckScreen;

  before(() => {
    searchScreen = container.get(REGISTRATION_TYPES.SearchUser);
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    personRecordHubSearchAPI = container.get(
      REGISTRATION_TYPES.PersonRecordHubSearchAPI,
    );
    userNotFoundScreen = container.get(REGISTRATION_TYPES.UserNotFoundScreen);
    letsDoubleCheckScreen = container.get(
      REGISTRATION_TYPES.LetsDoubleCheckScreen,
    );
  });

  beforeEach(async () => {
    const resourceIdToTest = '9884fbc4-818d-4629-b2bc-1934eb97c00d';
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
      zipCode: '38541',
    });
    await userNotFoundScreen.waitForScreenToLoad();
  });

  afterEach(async () => {
    await searchScreen.terminateAndLaunchApp();
  });

  it('User Not Found Screen Page Contents and TryAgain Navigation', async () => {
    await userNotFoundScreen.validateUserNotFoundPageContents();
    await userNotFoundScreen.validateUserNotFoundPageButtons();
    await userNotFoundScreen.tapIsThisInfoCorrect();
    await letsDoubleCheckScreen.waitForScreenToLoad();
    await letsDoubleCheckScreen.validateLabelAndPlaceHolderText();
    await letsDoubleCheckScreen.tapBackButton();
    await userNotFoundScreen.waitForScreenToLoad();
    await userNotFoundScreen.validateUserNotFoundPageButtons();
    await userNotFoundScreen.tapTryAgainButton();
    await searchScreen.waitForWaitElement();
    await searchScreen.getNextButton().click();
    await userNotFoundScreen.waitForScreenToLoad();
  });

  it('User Not Found Screen Exit Navigation', async () => {
    await userNotFoundScreen.tapExitButton();
    await deepLink.navigateLogin();
  });
});
