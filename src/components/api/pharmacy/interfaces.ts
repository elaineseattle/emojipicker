import { PrescriptionApiResponse } from './model/prescription-api.response';
import { OrderResponse } from './model/order-api.response';

export interface PrescriptionAPI {
  getAllPrescription(limit: boolean): Promise<PrescriptionApiResponse>;
}

export interface OrderAPI {
  getAllOrders(limit: boolean): Promise<OrderResponse>;
}
