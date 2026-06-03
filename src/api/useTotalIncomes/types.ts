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