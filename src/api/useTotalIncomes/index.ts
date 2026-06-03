import { useCallback, useEffect, useState } from "react";
import type { ApiResponse, Period } from "./types";

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