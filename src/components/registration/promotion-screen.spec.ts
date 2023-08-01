import { PromoScreen } from '../../support/features/registration/promo/promo.screen';
import { container } from '../../support/inversify.config';
import { REGISTRATION_TYPES } from '../../support/features/registration/registration.symbols';
import { OnBoardingScreen } from '../../support/features/shared/on-boarding.screen';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';

describe('Promotion Screen Validation', () => {
  let promoScreen: PromoScreen;
  let onBoardingScreen: OnBoardingScreen;

  before(() => {
    promoScreen = container.get(REGISTRATION_TYPES.PromoScreen);
    onBoardingScreen = container.get(SHARED_TYPES.OnBoardingScreen);
  });

  it('Validate Promo Screen Page Content', async () => {
    await onBoardingScreen.waitForScreenToLoad();
    await onBoardingScreen.clickRegister();
    await promoScreen.waitForScreenToLoad();
    await promoScreen.validatePageContents();
  });
});

// TODO: TestIDs needs to be updated for missed elements.
// TODO: InfoIcon needs to be validated.
// TODO: Boost Your Health and Maximize Benefits needs to be validated.
