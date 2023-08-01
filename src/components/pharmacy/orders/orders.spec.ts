import { DeepLink } from '../../../support/features/shared/shared.interfaces';
import { container } from '../../../support/inversify.config';
import { SHARED_TYPES } from '../../../support/features/shared/shared.symbols';
import { NavigationMenu } from '../../../support/shared/constants';
import { MyMedicationScreen } from '../../../support/features/pharmacy/scenes/my-medications/my-medication.screen';
import { OrderHistoryScreen } from '../../../support/features/pharmacy/scenes/order-history/order-history.screen';
import { PHARMACY_TYPES } from '../../../support/features/pharmacy/pharmacy.symbol';
describe('Orders', () => {
  before(async () => {
    const deepLink = container.get<DeepLink>(SHARED_TYPES.DeepLink);
    await deepLink.deeplinkLogin(
      {
        username: 'mycignawebqatest@cigna.com',
      },
      {
        screenName: NavigationMenu.Pharmacy,
      },
    );
  });

  describe('my medications screen', () => {
    const myMedicationScreen = container.get<MyMedicationScreen>(
      PHARMACY_TYPES.MyMedicationScreen,
    );
    it('should have valid compact cards', async () => {
      await myMedicationScreen.waitForScreenToLoad();
      await myMedicationScreen.validateAllCompactOrderCards();
    });
    it('should navigate correctly to the order history screen', async () => {
      await myMedicationScreen.clickViewAllOrders();
    });
  });
  describe('order history screen', async () => {
    const orderHistoryScreen = container.get<OrderHistoryScreen>(
      PHARMACY_TYPES.OrderHistoryScreen,
    );
    await orderHistoryScreen.validateAllFullOrderCards();
  });
});
