import { formatPrice } from '../../utils/formatPrice'
import type { DasboardCardProps } from './type'; 
import { useHeaderDashboard } from '../../stores/headerDashboradStore/useHeaderDashboard';

const labelToSelector: Record<string, (state: ReturnType<typeof useHeaderDashboard.getState>) => number> = {
  "Ingresos totales": (state) => state.totalRevenue,
  "Ordenes": (state) => state.totalOrders,
  "Productos": (state) => state.totalProducts,
  "Eventos": (state) => state.totalEvents,
};

function DashboardMainCard({label,image}:DasboardCardProps) {
  const selector = labelToSelector[label] ?? (() => 0);
  const number = useHeaderDashboard(selector);
  return (
    <div className="w-54 h-full bg-light-blue grid grid-cols-[162px_1fr] grid-rows-[auto_auto] p-2">
      <h3 className="text-p-16 text-dark-green font-semibold col-start-1 col-end-3 row-start-1 row-end-2">{label}</h3>
      <p className="font-antonio text-h3-24 col-start-1 col-end-2 row-start-2 row-end-3">{label.toLowerCase().includes("ingresos") ? formatPrice(number) : number}</p>
          <img className="h-6 w-6 col-start-2 col-end-3 row-start-2 row-end-3 self-center justify-self-center" 
          src={image} />
    </div>
  )
}

export default DashboardMainCard
