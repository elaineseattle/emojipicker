import { SearchUserScreen } from '../../support/features/registration/search-user/search-user.screen';
import { container } from '../../support/inversify.config';
import { REGISTRATION_TYPES } from '../../support/features/registration/registration.symbols';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import { UnableToRegisterScreen } from '../../support/features/registration/unable-register-screen/unable-to-register.screen';
import { DeepLink } from '../../support/features/shared/shared.interfaces';

describe('Unable To Register Screen Validation', () => {
  let searchScreen: SearchUserScreen;
  let deepLink: DeepLink;
  let unableToRegisterScreen: UnableToRegisterScreen;

  before(() => {
    searchScreen = container.get(REGISTRATION_TYPES.SearchUser);
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    unableToRegisterScreen = container.get(
      REGISTRATION_TYPES.UnableToRegisterScreen,
    );
  });

  it('Unable To Register Screen', async () => {
    await deepLink.navigateRegister();
    await searchScreen.waitForScreenToLoad();
    await searchScreen.validateDidYouChangeNameAddressLink();
    await unableToRegisterScreen.waitForScreenToLoad();
    await unableToRegisterScreen.validateLabelAndPlaceHolderText();
    await unableToRegisterScreen.tapBackButton();
    await searchScreen.waitForScreenToLoad();
  });
});
