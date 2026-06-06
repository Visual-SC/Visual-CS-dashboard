import { useMemo } from "react";
import { useDateOrders } from "../../api/useDateorders";
import { FormatDate } from "../../utils/FormatDate";
import type { DayOption, UseTableSelectCardReturn } from "./type";


export function useTableSelectCard(): UseTableSelectCardReturn {
  const { last5 } = useDateOrders();

  const dayOptions = useMemo<DayOption[]>(() => {
    if (!last5.days || last5.days.length === 0) return [];

    return last5.days
      .map((dayISO) => {
        const dayDate = new Date(dayISO);
        const dayKey = dayDate.toISOString().split("T")[0];
        const formatDate = new FormatDate(dayDate);
        return {
          id: dayKey,
          fechaOriginal: dayKey,
          fechaFormateada: formatDate.toSpanishFormat(),
        };
      })
      .sort((a, b) => b.fechaOriginal.localeCompare(a.fechaOriginal));
  }, [last5.days]);

  return {
    dayOptions,
    isLoading: last5.isLoading,
    error: last5.error,
    refetch: last5.refetch,
  };
}