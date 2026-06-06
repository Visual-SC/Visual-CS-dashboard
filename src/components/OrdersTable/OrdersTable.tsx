import type { Order, OrdersTableProps } from './type';
import { ESTADO_STYLES } from './data';
import { formatPrice } from '../../utils/formatPrice';

const SAMPLE_ORDERS: Order[] = [
  { id: "1", fecha: "2026-05-17", mesa: "B", estado: "Completada", total: 120000 },
  { id: "2", fecha: "2026-05-17", mesa: "C", estado: "Completada", total: 120000 },
  { id: "3", fecha: "2026-05-17", mesa: "F", estado: "Preparando", total: 85000 },
  { id: "4", fecha: "2026-05-17", cliente: "Vicente Alfonso Fernández", mesa: "D", estado: "Preparando", total: 85000 },
  { id: "5", fecha: "2026-05-18", cliente: "Vicente Alfonso Fernández", mesa: "D", estado: "Preparando", total: 12500 },
  { id: "6", fecha: "2026-05-18", cliente: "Alfonso Daniel Franco",    mesa: "A", estado: "Preparando", total: 12500 },
  { id: "7", fecha: "2026-05-18", cliente: "Alfonso Daniel Franco",    mesa: "A", estado: "Completada", total: 12500 },
  { id: "8", fecha: "2026-05-18", cliente: "Andrea Zuluaga",           mesa: "F1",estado: "Completada", total: 12500 },
];

export default function OrdersTable({
  orders,
  onEdit,
  onDetail,
  onDelete,
}: OrdersTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
            <th className="px-4 py-3 text-left w-[107px] font-medium">
              <span className="inline-flex items-center gap-1">
                Fecha
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 8l5-5 5 5M7 16l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </th>
            <th className="px-4 py-3 text-left w-[291px] font-medium">
              <span className="inline-flex items-center gap-1">
                Cliente
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 8l5-5 5 5M7 16l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </th>
            <th className="px-4 py-3 text-left w-[93px] font-medium">
              <span className="inline-flex items-center gap-1">
                Mesa
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 8l5-5 5 5M7 16l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </th>
            <th className="px-4 py-3 text-left w-[127px] font-medium">
              <span className="inline-flex items-center gap-1">
                Estado
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 8l5-5 5 5M7 16l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </th>
<th className="px-4 py-3 text-left w-[101px] font-medium">
              <span className="inline-flex items-center gap-1">
                Total
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 8l5-5 5 5M7 16l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </th>
            <th className="px-4 py-3 text-left w-[137px] font-medium">Opciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {SAMPLE_ORDERS.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-4 py-4 w-[107px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {order.fecha ?? "—"}
              </td>
              <td className="px-4 py-4 w-[291px] text-gray-800 dark:text-gray-100 font-medium truncate">
                {order.cliente ?? "—"}
              </td>
              <td className="px-4 py-4 w-[93px] text-gray-700 dark:text-gray-300 font-semibold">
                {order.mesa}
              </td>
              <td className="px-4 py-4 w-[127px]">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${ESTADO_STYLES[order.estado]}`}
                >
                  {order.estado}
                </span>
              </td>
              <td className="px-4 py-4 w-[101px] text-gray-800 dark:text-gray-100 font-medium">
                {formatPrice(order.total)}
              </td>
              <td className="px-4 py-4 w-[137px]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit?.(order)}
                    aria-label="Editar orden"
                    className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDetail?.(order)}
                    aria-label="Ver detalle"
                    className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => onDelete?.(order)}
                    aria-label="Eliminar orden"
                    className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-10 text-center text-gray-400 dark:text-gray-500 text-sm"
              >
                No hay órdenes registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
