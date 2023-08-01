import { RegistrationUtil } from '../../../support/api/registration/interfaces';
import { container } from '../../../support/inversify.config';
import { REGISTRATION_TYPES } from '../../../support/features/registration/registration.symbols';
import { DeepLink } from '../../../support/features/shared/shared.interfaces';
import { SHARED_TYPES } from '../../../support/features/shared/shared.symbols';
import { LoginScreen } from '../../../support/features/login/scenes/screen-login';
import { LOGIN_TYPES } from '../../../support/features/login/login.symbol';
import { DEFAULT_PASSWORD } from '../../../support/shared/constants';
import { getEmailToRegisterFromPersonResourceID } from '../../../support/shared/shared.util';
import { PostMFAOperation } from '../../../support/features/login/scenes/screen-login/constants';
import { DashboardScreen } from '../../../support/features/dashboard/scenes/screen-dashboard';
import { DASHBOARD_TYPES } from '../../../support/features/dashboard/dashboard.symbol';
import { verifyEmailUsingAPI } from '@cigna/shared/webdriverio-util';

describe('MFA Login', () => {
  let registrationUtil: RegistrationUtil;
  let deepLink: DeepLink;
  let loginScreen: LoginScreen;
  let dashboardScreen: DashboardScreen;

  before(() => {
    registrationUtil = container.get(REGISTRATION_TYPES.RegistrationUtil);
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    loginScreen = container.get(LOGIN_TYPES.LoginScreen);
    dashboardScreen = container.get(DASHBOARD_TYPES.DashboardScreen);
  });

  it('MFA', async () => {
    const personResourceId = 'c21ec3e4-7c2a-4b17-ad7e-03718d718631';
    const emailToRegister = getEmailToRegisterFromPersonResourceID(
      personResourceId,
      true,
    );
    await registrationUtil.unregisterMemberAtAuth0AndPersonRecordHub(
      personResourceId,
      emailToRegister,
    );
    const userToRegister = await registrationUtil
      .getPersonRecordHubAPI()
      .getDemographicFromResourceId(personResourceId);

    await registrationUtil.registerUserAPI({
      firstName: userToRegister.firstName,
      lastName: userToRegister.lastName,
      birthDate: userToRegister.birthDate.format('YYYY-MM-DD'),
      email: emailToRegister,
      ssn: userToRegister.ssn,
      postalCode: '81120',
    });

    await verifyEmailUsingAPI(emailToRegister);

    await deepLink.navigateLogin();

    await loginScreen.enterCredentialAndTapLogin(
      emailToRegister,
      DEFAULT_PASSWORD,
    );
    await loginScreen.addPhoneNumberAndVerify();
    await loginScreen.performPostMFAOperation(PostMFAOperation.NotOnDevice);
    await dashboardScreen.waitForScreenToLoad();
  });
});
