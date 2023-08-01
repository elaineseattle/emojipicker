import { container } from '../../support/inversify.config';
import { OnBoardingScreen } from '../../support/features/shared/on-boarding.screen';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import { InformationScreen } from '../../support/features/information/scenes/information-screen';
import { INFORMATION_TYPES } from '../../support/features/information/information.symbol';

describe('OnBoarding Screen', () => {
  let onBoardingScreen: OnBoardingScreen;
  let infoScreen: InformationScreen;

  before(() => {
    onBoardingScreen = container.get(SHARED_TYPES.OnBoardingScreen);
    infoScreen = container.get(INFORMATION_TYPES.InformationScreen);
  });

  afterEach(async () => {
    await onBoardingScreen.terminateAndLaunchApp();
  });

  it('OnBoarding Screen Validation', async () => {
    await onBoardingScreen.waitForScreenToLoad();
    await onBoardingScreen.validateEverNorthLogo();
    await onBoardingScreen.validateEverNorthIllustrationImage();
    await onBoardingScreen.validatePageContents();
    await onBoardingScreen.validateOnBoardingButtons();
  });

  it('OnBoarding Screen Info Icon Validation', async () => {
    await onBoardingScreen.waitForScreenToLoad();
    await onBoardingScreen.tapInfoIcon();
    await infoScreen.waitForScreenToLoad();
    await infoScreen.validatePageContents();
    await infoScreen.tapBackButton();
    await onBoardingScreen.waitForScreenToLoad();
  });
});
