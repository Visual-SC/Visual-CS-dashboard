import { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';
import type { ChartDataItem, Period } from '../../api/useTotalIncomes/types';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const CHART_COLORS = [
  { bg: 'rgba(255, 99, 132, 0.5)', border: 'rgb(255, 99, 132)' },
  { bg: 'rgba(255, 159, 64, 0.5)', border: 'rgb(255, 159, 64)' },
  { bg: 'rgba(255, 205, 86, 0.5)', border: 'rgb(255, 205, 86)' },
  { bg: 'rgba(75, 192, 192, 0.5)', border: 'rgb(75, 192, 192)' },
  { bg: 'rgba(54, 162, 235, 0.5)', border: 'rgb(54, 162, 235)' },
  { bg: 'rgba(153, 102, 255, 0.5)', border: 'rgb(153, 102, 255)' },
  { bg: 'rgba(201, 203, 207, 0.5)', border: 'rgb(201, 203, 207)' },
];

function getColors(count: number) {
  const bg: string[] = [];
  const border: string[] = [];
  for (let i = 0; i < count; i++) {
    bg.push(CHART_COLORS[i % CHART_COLORS.length].bg);
    border.push(CHART_COLORS[i % CHART_COLORS.length].border);
  }
  return { bg, border };
}

function formatLabel(dateStr: string, period: Period): string {
  if (period === 'monthly') {
    const [year, month] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString('es-CO', { month: 'short', year: '2-digit' });
  }
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
}

interface UseTotalIncomesGraphProps {
  data: { data: { chartData: ChartDataItem[] } } | undefined;
  period: Period;
}

export function useTotalIncomesGraph({ data, period }: UseTotalIncomesGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const delayedRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || !data?.data.chartData) return;

    delayedRef.current = false;

    const chartData = data.data.chartData;
    const canvas = canvasRef.current;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const labels = chartData.map((item: ChartDataItem) => formatLabel(item.date, period));
    const values = chartData.map((item: ChartDataItem) => item.total);
    const colors = getColors(values.length);

    let rafId2 = 0;
    const rafId = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        if (!canvas) return;

        chartRef.current = new Chart(canvas, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: colors.bg,
                hoverBackgroundColor: colors.border,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: 'bottom',
                barPercentage: 0.55,
                categoryPercentage: 0.8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: { top: 10, bottom: 0, left: 0, right: 0 },
            },
            scales: {
              x: {
                grid: { display: false },
                border: { display: false },
                ticks: { color: '#9CA3AF', font: { size: 12 } },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0,0,0,0.06)',
                  lineWidth: 1,
                  drawTicks: false,
                  borderDash: [4, 4],
                },
                border: { display: false },
                ticks: {
                  color: '#9CA3AF',
                  font: { size: 12 },
                  callback: (value) => '$ ' + Number(value).toLocaleString('es-CO'),
                  padding: 8,
                },
              },
            },
            animation: {
              onComplete: () => {
                delayedRef.current = true;
              },
              delay: (context) => {
                if (
                  context.type === 'data' &&
                  context.mode === 'default' &&
                  !delayedRef.current
                ) {
                  return context.dataIndex * 150;
                }
                return 0;
              },
              duration: 800,
              easing: 'easeOutQuart',
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#ffffff',
                titleColor: '#374151',
                bodyColor: '#374151',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                  label: (context) =>
                    '$ ' + ((context.parsed.y ?? 0) as number).toLocaleString('es-CO'),
                },
              },
            },
          },
        });
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafId2);
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, period]);

  return { canvasRef };
}