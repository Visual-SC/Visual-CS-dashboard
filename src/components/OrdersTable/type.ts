export interface Order {
  id: string;
  fecha?: string;
  cliente?: string;
  mesa: string;
  estado: "Completada" | "Preparando";
  total: number;
}

export interface OrdersTableProps {
  orders: Order[];
  onEdit?: (order: Order) => void;
  onDetail?: (order: Order) => void;
  onDelete?: (order: Order) => void;
}