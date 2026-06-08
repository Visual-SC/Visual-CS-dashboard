import { useMemo } from "react";
import { useDateOrders } from "../../api/useDateorders";
import { FormatDate } from "../../utils/FormatDate";
import type { DayOption, UseTableSelectCardReturn } from "./type";

export function useTableSelectCard(): UseTableSelectCardReturn {
  const { availableDays, isLoading, error, refetch, selectDate } = useDateOrders();

  const dayOptions: DayOption[] = useMemo(() => {
    return availableDays.map((dateString) => {
      const [year, month, day] = dateString.split("-");
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      const formateada = new FormatDate(date).toSpanishFormat();

      return {
        id: dateString,
        fechaOriginal: dateString,
        fechaFormateada: formateada,
      };
    });
  }, [availableDays]);

  return { dayOptions, isLoading, error, refetch, selectDate };
}