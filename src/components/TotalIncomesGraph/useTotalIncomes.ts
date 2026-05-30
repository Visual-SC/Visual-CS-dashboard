import { useCallback, useEffect, useState } from "react";

export type Period = "daily" | "monthly";

export interface ChartDataItem {
  date: string;
  total: number;
  orders: number;
}

export interface ApiResponse {
  status: string;
  message: string;
  data: {
    type: Period;
    chartData: ChartDataItem[];
  };
}

const BASE_URL = "http://localhost:3001/api/order-revenue";

export function useTotalIncomes(initialPeriod: Period = "daily") {
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (period: Period) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/${period}`);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json: ApiResponse = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(period);
  }, [period, fetchData]);

  const togglePeriod = useCallback(() => {
    setPeriod((prev) => (prev === "daily" ? "monthly" : "daily"));
  }, []);

  return { data, period, setPeriod, togglePeriod, isLoading, error, refetch: () => fetchData(period) };
}
