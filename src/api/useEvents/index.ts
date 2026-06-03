import { useCallback, useEffect, useState } from "react";
import type { EventsResponse } from "./types";

const BASE_URL = "http://localhost:3001/api/get-events";

export function useEvents() {
  const [data, setData] = useState<EventsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(BASE_URL);
      
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json: EventsResponse = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}