import { useMemo } from "react";
import { useTotalOrders } from "../../api/getTotalOrders";
import type { OrdenCafe } from "../../api/getTotalOrders";
import type { ProductItem, TopProduct } from "./type";


export function useTopProducts(limit = 5) {
  const { data, isLoading, error, refetch } = useTotalOrders();

  const topProducts = useMemo(() => {
    if (!data?.data) return [];

    const productStats = new Map<string, { cantidad: number; total: number }>();

    data.data.forEach((order: OrdenCafe) => {
      (order.items as ProductItem[]).forEach((item: ProductItem) => {
        const nombre = item.nombre || (item as any).producto || "Unknown";
        const cantidad = item.cantidad || (item as any).quantity || 1;
        const precio = item.precio ?? (item as any).precio ?? (item as any).price ?? 0;
        const stats = productStats.get(nombre) || { cantidad: 0, total: 0 };
        stats.cantidad += cantidad;
        stats.total += cantidad * precio;
        productStats.set(nombre, stats);
      });
    });

    return Array.from(productStats.entries())
      .map(([nombre, { cantidad, total }]): TopProduct => ({ nombre, cantidad, total }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, limit);
  }, [data, limit]);

  return { topProducts, isLoading, error, refetch };
}