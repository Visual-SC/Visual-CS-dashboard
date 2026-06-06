export interface OrderItem {
  _id: string;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  disponible: boolean;
  imagen: string;
  ingredientes: string[];
  cantidad: number;
  total: number;
}

export interface Order {
  _id: string;
  numero_orden: string;
  fecha: string;
  estado: string;
  items: OrderItem[];
  resumen: {
    subtotal: number;
    total: number;
  };
  cliente: string;
  numero_mesa: string;
}

export interface Last5OrdersResponse {
  status: string;
  message: string;
  data: {
    year: number;
    month: number;
    totalOrders: number;
    orders: Order[];
  };
}

export interface MonthlyOrdersResponse {
  status: string;
  message: string;
  data: {
    year: number;
    month: number;
    totalOrders: number;
    orders: Order[];
  };
}