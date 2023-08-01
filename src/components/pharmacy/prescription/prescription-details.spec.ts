import { DeepLink } from '../../../support/features/shared/shared.interfaces';
import { container } from '../../../support/inversify.config';
import { SHARED_TYPES } from '../../../support/features/shared/shared.symbols';
import { NavigationMenu } from '../../../support/shared/constants';
import { MyMedicationScreen } from '../../../support/features/pharmacy/scenes/my-medications/my-medication.screen';
import { PHARMACY_TYPES } from '../../../support/features/pharmacy/pharmacy.symbol';
import { PrescriptionDetailsScreen } from '../../../support/features/pharmacy/prescription-details.screen';

describe('Validate Prescription', () => {
  let deepLink: DeepLink;
  let myMedicationScreen: MyMedicationScreen;
  let prescriptionDetailsScreen: PrescriptionDetailsScreen;

  before(() => {
    deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    myMedicationScreen = container.get(PHARMACY_TYPES.MyMedicationScreen);
    prescriptionDetailsScreen = container.get(
      PHARMACY_TYPES.PrescriptionDetailsScreen,
    );
  });

  it('Prescription', async () => {
    await deepLink.deeplinkLogin(
      {
        username: 'mycignawebqatest@cigna.com',
      },
      {
        screenName: NavigationMenu.Pharmacy,
      },
    );
    await myMedicationScreen.validatePrescriptionCompactCard();
    await myMedicationScreen.clickViewAllPrescriptions();
    await myMedicationScreen.validatePrescriptionList();
  });

  it('PrescriptionDetails', async () => {
    await prescriptionDetailsScreen.clickPrescription();
    await prescriptionDetailsScreen.validatePrescriptionDetails();
  });
});
