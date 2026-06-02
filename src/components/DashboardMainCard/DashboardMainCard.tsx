import { formatPrice } from '../../utils/formatPrice'
import type { DasboardCardProps } from './type'; 
import { useDashboardMainCard } from './useDashboardMainCard';
import { useHeaderDashboard } from '../../stores/headerDashboradStore/useHeaderDashboard';

export type LabelType = 'Ingresos totales' | 'Ordenes' | 'Productos' | 'Eventos';

const labelToSelector: Record<LabelType, (state: ReturnType<typeof useHeaderDashboard.getState>) => number> = {
  "Ingresos totales": (state) => state.totalRevenue,
  "Ordenes": (state) => state.totalOrders,
  "Productos": (state) => state.totalProducts,
  "Eventos": (state) => state.totalEvents,
};

function getDisplayValue(label: LabelType, apiValues: { totalIncomes: number; totalOrders: number }, storeValue: number): { value: number; formatted: string } {
  switch (label) {
    case "Ingresos totales":
      return { value: apiValues.totalIncomes, formatted: formatPrice(apiValues.totalIncomes) };
    case "Ordenes":
      return { value: apiValues.totalOrders, formatted: apiValues.totalOrders.toString() };
    default:
      return { value: storeValue, formatted: storeValue.toString() };
  }
}

function DashboardMainCard({ label, image }: DasboardCardProps) {
  const { totalIncomes, totalOrders } = useDashboardMainCard();
  const selector = labelToSelector[label as LabelType] ?? (() => 0);
  const storeValue = useHeaderDashboard(selector);
  const { formatted: displayValue } = getDisplayValue(label as LabelType, { totalIncomes, totalOrders }, storeValue);
  
  return (
    <div className="w-54 h-full bg-light-blue grid grid-cols-[162px_1fr] grid-rows-[auto_auto] p-2">
      <h3 className="text-p-16 text-dark-green font-semibold col-start-1 col-end-3 row-start-1 row-end-2">{label}</h3>
      <p className="font-antonio text-h3-24 col-start-1 col-end-2 row-start-2 row-end-3">{displayValue}</p>
          <img className="h-6 w-6 col-start-2 col-end-3 row-start-2 row-end-3 self-center justify-self-center" 
          src={image} />
    </div>
  )
}

export default DashboardMainCard
