import { useCallback, useEffect, useState } from "react";
import type { Last5OrdersResponse, MonthlyOrdersResponse, Order } from "./types";

const BASE_URL = "http://localhost:3001/api/order-date";

export function useDateOrders() {
  const [last5Data, setLast5Data] = useState<Order[] | null>(null);
  const [monthlyData, setMonthlyData] = useState<{ year: number; month: number; totalOrders: number; orders: Order[] } | null>(null);
  const [isLoadingLast5, setIsLoadingLast5] = useState(false);
  const [isLoadingMonthly, setIsLoadingMonthly] = useState(false);
  const [errorLast5, setErrorLast5] = useState<string | null>(null);
  const [errorMonthly, setErrorMonthly] = useState<string | null>(null);

  const fetchLast5 = useCallback(async () => {
    setIsLoadingLast5(true);
    setErrorLast5(null);

    try {
      const res = await fetch(`${BASE_URL}/last5`);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json: Last5OrdersResponse = await res.json();
      setLast5Data(json.data.orders);
    } catch (err) {
      setErrorLast5(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoadingLast5(false);
    }
  }, []);

  const fetchMonthly = useCallback(async (year: number, month: number) => {
    setIsLoadingMonthly(true);
    setErrorMonthly(null);

    try {
      const res = await fetch(`${BASE_URL}/monthly?year=${year}&month=${month}`);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json: MonthlyOrdersResponse = await res.json();
      setMonthlyData(json.data);
    } catch (err) {
      setErrorMonthly(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoadingMonthly(false);
    }
  }, []);

  useEffect(() => {
    fetchLast5();
  }, [fetchLast5]);

  return {
    last5: { data: last5Data, isLoading: isLoadingLast5, error: errorLast5, refetch: fetchLast5 },
    monthly: { data: monthlyData, isLoading: isLoadingMonthly, error: errorMonthly, fetch: fetchMonthly },
  };
}