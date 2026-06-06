import { useMemo } from "react";
import { useDateOrders } from "../../api/useDateorders";
import { FormatDate } from "../../utils/FormatDate";
import type { DayOption, UseTableSelectCardReturn } from "./type";


export function useTableSelectCard(): UseTableSelectCardReturn {
  const { last5 } = useDateOrders();

  const dayOptions = useMemo<DayOption[]>(() => {
    if (!last5.data) return [];

    const daysMap = new Map<string, { count: number; total: number }>();

    last5.data.forEach((order) => {
      const date = new Date(order.fecha);
      const dayKey = date.toISOString().split("T")[0];

      const existing = daysMap.get(dayKey) || { count: 0, total: 0 };
      daysMap.set(dayKey, {
        count: existing.count + 1,
        total: existing.total + order.resumen.total,
      });
    });

    return Array.from(daysMap.keys())
      .map((dayKey) => {
        const formatDate = new FormatDate(new Date(dayKey));
        return {
          id: dayKey,
          fechaOriginal: dayKey,
          fechaFormateada: formatDate.toSpanishFormat(),
        };
      })
      .sort((a, b) => b.fechaOriginal.localeCompare(a.fechaOriginal));
  }, [last5.data]);

  return {
    dayOptions,
    isLoading: last5.isLoading,
    error: last5.error,
    refetch: last5.refetch,
  };
}