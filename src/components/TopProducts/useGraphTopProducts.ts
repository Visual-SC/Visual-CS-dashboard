import { useEffect, useRef, useMemo } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTopProducts } from "./useTopProducts";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
];

export function useGraphTopProducts() {
  const { topProducts, isLoading, error, refetch } = useTopProducts(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const chartData = useMemo(() => {
    return {
      labels: topProducts.map((p) => p.nombre),
      datasets: [
        {
          data: topProducts.map((p) => p.cantidad),
          backgroundColor: CHART_COLORS,
          borderColor: "#ffffff",
          borderWidth: 3,
          hoverOffset: 8,
        },
      ],
    };
  }, [topProducts]);

  useEffect(() => {
    if (!canvasRef.current || topProducts.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "60%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 900,
          easing: "easeOutQuart",
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [chartData]);

  return { canvasRef, chartData, topProducts, isLoading, error, refetch };
}