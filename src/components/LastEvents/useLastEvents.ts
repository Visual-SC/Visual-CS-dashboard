import { useMemo } from "react";
import { useEvents } from "../../api/useEvents/index";

export function useLastEvents() {
  const { data, isLoading, error, refetch } = useEvents();
  
  const lastEvents = useMemo(() => {
    if (!data?.data) return [];
    return [...data.data].slice(0, 3);
  }, [data]);

  return { lastEvents, isLoading, error, refetch };
}