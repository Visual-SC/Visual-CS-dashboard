export interface OrdenCafe {
  _id: string;
  numero_orden: string;
  fecha: string;
  estado: "pendiente" | "preparando" | "completada" | "cancelada";
  items: object[];
  resumen: {
    subtotal: number;
    impuestos: number;
    propinas: number;
    total: number;
  };
  cliente: string;
  numero_mesa: string;
}

export interface OrdersResponse {
  status: string;
  message: string;
  data: OrdenCafe[];
}