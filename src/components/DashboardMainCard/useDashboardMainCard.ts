import { useTotalIncomes } from "../../api/getTotalncomes";

export function useDashboardMainCard() {
  const { data, isLoading, error } = useTotalIncomes();

  const totalIncomes = data?.data?.chartData
    ? data.data.chartData.reduce((sum, item) => sum + item.total, 0)
    : 0;

  const totalOrders = data?.data?.chartData
    ? data.data.chartData.reduce((sum, item) => sum + item.orders, 0)
    : 0;

  return {
    totalIncomes,
    totalOrders,
    isLoading,
    error,
  };
}
