import {
  SURVEY_SHARED_TYPES,
  SurveyUtil,
} from '@cigna/shared/webdriverio-util/elevate';
import { container } from '../../support/inversify.config';
import { AppType, AlertComponent } from '@cigna/shared/webdriverio-util';
import { LoginScreen } from '../../support/features/login/scenes/screen-login';
import { LOGIN_TYPES } from '../../support/features/login/login.symbol';
import { OnBoardingScreen } from '../../support/features/shared/on-boarding.screen';
import { SHARED_TYPES } from '../../support/features/shared/shared.symbols';

describe('Survey', () => {
  let onBoardingScreen: OnBoardingScreen;
  let alertComponent: AlertComponent;
  let loginScreen: LoginScreen;
  let surveyUtil: SurveyUtil;

  before(() => {
    onBoardingScreen = container.get(SHARED_TYPES.OnBoardingScreen);
    alertComponent = container.get(SHARED_TYPES.AlertComponent);
    loginScreen = container.get(LOGIN_TYPES.LoginScreen);
    surveyUtil = container.get(SURVEY_SHARED_TYPES.SurveyUtil);
  });

  it('E2E Login Flow', async () => {
    const email = `digitalqe2@cigna.com`;
    await onBoardingScreen.clickLogin();
    if (driver.isIOS) {
      await alertComponent.waitForAlertDisplayed();
      await alertComponent.acceptAlert();
    }
    await loginScreen.login(email);
    await surveyUtil.clearAssessmentForUserBySub(AppType.EVERNORTH);
  });
});
