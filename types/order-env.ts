import type { Product } from "./product-env";

export type EstadoOrden = 'pendiente' | 'preparando' | 'completada' | 'cancelada';
export type NumeroDeMesa = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'F1' | 'F2' | 'F3' | 'F4';

export interface ProductOrderProps extends Product {
  cantidad: number;
  total: number;
}

export interface ProductCardOrderProps extends ProductOrderProps {
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  discardProduct: () => void;
}

export type ResumenOrden = {
  subtotal: number;
  total: number;
}

export type OrderInitial = {
    numero_orden: string,
    fecha: Date | string,
    estado: EstadoOrden | string,
    items: ProductOrderProps[],
    resumen: ResumenOrden,
    _id: string,
    cliente: string,
    numero_mesa: NumeroDeMesa | string,
}

