import { useTotalIncomes } from "../../api/useTotalIncomes";
import { useProducts } from "../../api/useProducts";
import { useEvents } from "../../api/useEvents";

export function useDashboardMainCard() {
  const { data, isLoading, error } = useTotalIncomes();
  const { data: productsData } = useProducts();
  const { data: eventsData } = useEvents();

  const totalIncomes = data?.data?.chartData
    ? data.data.chartData.reduce((sum, item) => sum + item.total, 0)
    : 0;

  const totalOrders = data?.data?.chartData
    ? data.data.chartData.reduce((sum, item) => sum + item.orders, 0)
    : 0;

  const totalProducts = productsData?.data?.length ?? 0;

  const totalEvents = eventsData?.data?.length ?? 0;

  return {
    totalIncomes,
    totalOrders,
    totalProducts,
    totalEvents,
    isLoading,
    error,
  };
}
