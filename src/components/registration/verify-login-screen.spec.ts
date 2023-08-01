import { OnBoardingScreen } from '../../support/features/shared/on-boarding.screen';
import { container } from '../../support/inversify.config';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';
import { LoginScreen } from '../../support/features/login/scenes/screen-login';
import { LOGIN_TYPES } from '../../support/features/login/login.symbol';
import { AlertComponent } from '@cigna/shared/webdriverio-util';
import { DeepLink } from '../../support/features/shared/shared.interfaces';

describe('Login Screen', () => {
  let onBoardingScreen: OnBoardingScreen;
  let alertComponent: AlertComponent;
  let loginScreen: LoginScreen;
  let deepLink: DeepLink;

  before(() => {
    onBoardingScreen = container.get(SHARED_TYPES.OnBoardingScreen);
    alertComponent = container.get(SHARED_TYPES.AlertComponent);
    loginScreen = container.get(LOGIN_TYPES.LoginScreen);
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
  });

  it('Login Web View Validation', async () => {
    await deepLink.navigateLogin();
    await loginScreen.waitForScreenToLoad();
    await loginScreen.validateLoginPage();
  });
});
