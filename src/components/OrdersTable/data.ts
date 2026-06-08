import type { OrderTable } from './type';

export const ESTADO_STYLES: Record<OrderTable["estado"], string> = {
  Completada:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Preparando:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
};