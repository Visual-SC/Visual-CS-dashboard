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
  { bg: 'rgba(255, 99, 132, 0.5)', border: 'rgb(255, 99, 132)' },
  { bg: 'rgba(255, 159, 64, 0.5)', border: 'rgb(255, 159, 64)' },
  { bg: 'rgba(255, 205, 86, 0.5)', border: 'rgb(255, 205, 86)' },
  { bg: 'rgba(75, 192, 192, 0.5)', border: 'rgb(75, 192, 192)' },
  { bg: 'rgba(54, 162, 235, 0.5)', border: 'rgb(54, 162, 235)' },
  { bg: 'rgba(153, 102, 255, 0.5)', border: 'rgb(153, 102, 255)' },
  { bg: 'rgba(201, 203, 207, 0.5)', border: 'rgb(201, 203, 207)' },
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
          backgroundColor: CHART_COLORS.map((c) => c.bg),
          borderColor: CHART_COLORS.map((c) => c.border),
          borderWidth: 1,
          hoverOffset: 4,
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