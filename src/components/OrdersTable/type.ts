import type { OrderInitial } from '../../../types/order-env'

type OrderTableBase = Pick<OrderInitial, 'numero_orden' | 'estado' | 'resumen' | '_id' | 'cliente'>;

export interface OrderTable extends OrderTableBase {
  fecha: string;
  id: string;
  mesa: string;
  estado: "Completada" | "Preparando";
  total: number;
  onEdit?: () => void;
  onDetail?: () => void;
  onDelete?: () => void;
}

export interface OrdersTableProps {
  orders: OrderTable[];
}