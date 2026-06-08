import { useCallback, useEffect, useState } from "react";
import type { OrderInitial } from '../../../types/order-env'

const ORDERS_URL = "http://localhost:3001/api/get-orders";
const LAST_5_URL = "http://localhost:3001/api/order-date/last5";

export function useDateOrders() {
  const [orders, setOrders] = useState<OrderInitial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const fetchAllOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(ORDERS_URL);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json = await res.json();
      setOrders(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAvailableDays = useCallback(async () => {
    try {
      const res = await fetch(LAST_5_URL);
      if (!res.ok) return;
      const json = await res.json();
      const days: string[] = json.data?.days ?? json.days ?? json.last5Days ?? [];
      setAvailableDays(days);
    } catch {
      // disponible los días es opcional
    }
  }, []);

  const fetchByDate = useCallback(async (date: string) => {
    setIsLoading(true);
    setError(null);
    setSelectedDate(date);

    try {
      const res = await fetch(`${LAST_5_URL}?date=${date}`);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json = await res.json();
      const result = json.data?.dailyOrders?.[0]?.orders ?? [];
      setOrders(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearDate = useCallback(() => {
    setSelectedDate(null);
    fetchAllOrders();
  }, [fetchAllOrders]);

  useEffect(() => {
    fetchAllOrders();
    fetchAvailableDays();
  }, [fetchAllOrders, fetchAvailableDays]);

  return {
    orders,
    isLoading,
    error,
    refetch: fetchAllOrders,
    availableDays,
    selectedDate,
    selectDate: fetchByDate,
    clearDate,
  };
}
