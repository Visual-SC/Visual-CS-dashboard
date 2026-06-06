import type { OrderInitial } from '../../../types/order-env'

export interface Last5OrdersResponse {
  status: string;
  message: string;
  data: {
    year: number;
    month: number;
    totalOrders: number;
    orders: OrderInitial[];
  };
}

export interface MonthlyOrdersResponse {
  status: string;
  message: string;
  data: {
    year: number;
    month: number;
    totalOrders: number;
    orders: OrderInitial[];
  };
}