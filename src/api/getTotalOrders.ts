import { useCallback, useEffect, useState } from "react";

export interface OrdenCafe {
  _id: string;
  numero_orden: string;
  fecha: string;
  estado: "pendiente" | "preparando" | "completada" | "cancelada";
  items: object[];
  resumen: {
    subtotal: number;
    impuestos: number;
    propinas: number;
    total: number;
  };
  cliente: string;
  numero_mesa: string;
}

export interface OrdersResponse {
  status: string;
  message: string;
  data: OrdenCafe[];
}

const BASE_URL = "http://localhost:3001/api/get-orders";

export function useTotalOrders() {
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json: OrdersResponse = await res.json();
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