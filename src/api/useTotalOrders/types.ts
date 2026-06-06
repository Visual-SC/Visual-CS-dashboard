import type { OrderInitial } from '../../../types/order-env';

export interface OrdersResponse {
  status: string;
  message: string;
  data: OrderInitial[];
}