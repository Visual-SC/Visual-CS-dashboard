import { useState } from 'react';
import type { Order, OrdersTableProps } from './type';
import { ESTADO_STYLES } from './data';
import { formatPrice } from '../../utils/formatPrice';
import Tooltip from '../Tooltip/Tooltip';

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
  const [hoveredTooltip, setHoveredTooltip] = useState<{ orderId: string; button: 'edit' | 'view' | 'delete' } | null>(null);

  return (
    <div className="w-full overflow-x-auto rounded-md bg-white">
      <table className="w-full text-p-16 table-fixed bg-white">
        <thead className="font-semibold">
          <tr className="bg-light-dash-green text-p-16 text-dark-green">
            <th className=" text-center w-27">
              <span className="inline-flex items-center gap-1">
                Fecha
                <img src="./lets-icons_sort-arrow.svg" alt="Fecha"/>
              </span>
            </th>
            <th className="text-center w-73 font-semibold">
              <span className="inline-flex items-center gap-1">
                Cliente
                <img src="./lets-icons_sort-arrow.svg" alt="Fecha"/>
              </span>
            </th>
            <th className="text-center w-23 font-semibold">
              <span className="inline-flex items-center gap-1">
                Mesa
                <img src="./lets-icons_sort-arrow.svg" alt="Fecha"/>
              </span>
            </th>
            <th className="text-center w-32 font-semibold">
              <span className="inline-flex items-center gap-1">
                Estado
                <img src="./lets-icons_sort-arrow.svg" alt="Fecha"/>
              </span>
            </th>
            <th className="px-4 py-3 text-left w-32 font-semibold">
              <span className="inline-flex items-center gap-1">
                Total
                <img src="./lets-icons_sort-arrow.svg" alt="Fecha"/>
              </span>
            </th>
            <th className="px-4 py-3 text-left w-35 font-semibold">Opciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {SAMPLE_ORDERS.map((order) => (
            <tr
              key={order.id}
              className="mt-1 bg-light-blue"
            >
              <td className="px-4 py-4 w-27 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {order.fecha ?? "—"}
              </td>
              <td className="px-4 py-4 w-73 text-gray-800 dark:text-gray-100 font-medium truncate">
                {order.cliente ?? "—"}
              </td>
              <td className="px-4 py-4 w-24 text-gray-700 dark:text-gray-300 font-semibold">
                {order.mesa}
              </td>
              <td className="px-4 py-4 w-32">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${ESTADO_STYLES[order.estado]}`}
                >
                  {order.estado}
                </span>
              </td>
              <td className="px-4 py-4 w-25 text-gray-800 dark:text-gray-100 font-medium">
                {formatPrice(order.total)}
              </td>
              <td className="px-4 py-4 w-36">
                <div className="flex items-center w-28 justify-between">
                  <div className="relative">
                    <button
                      onClick={() => onEdit?.(order)}
                      aria-label="Editar orden"
                      onMouseEnter={() => setHoveredTooltip({ orderId: order.id, button: 'edit' })}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="h-6 w-6 flex items-center justify-center cursor-pointer"
                    >
                      <img src="./image_edit.svg" alt="Editar" className="h-full w-full" />
                    </button>
                    <Tooltip showTooltip={hoveredTooltip?.orderId === order.id && hoveredTooltip?.button === 'edit'} label="Editar" />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => onDetail?.(order)}
                      aria-label="Ver detalle"
                      onMouseEnter={() => setHoveredTooltip({ orderId: order.id, button: 'view' })}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="h-6 w-6 flex items-center justify-center cursor-pointer"
                    >
                      <img src="./stash_invoice.svg" alt="Ver" className="h-full w-full" />
                    </button>
                    <Tooltip showTooltip={hoveredTooltip?.orderId === order.id && hoveredTooltip?.button === 'view'} label="Ver" />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => onDelete?.(order)}
                      aria-label="Eliminar orden"
                      onMouseEnter={() => setHoveredTooltip({ orderId: order.id, button: 'delete' })}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="h-6 w-6 flex items-center justify-center cursor-pointer"
                    >
                      <img src="./fluent_delete-16-regular.svg" alt="Eliminar" className="h-full w-full" />
                    </button>
                    <Tooltip showTooltip={hoveredTooltip?.orderId === order.id && hoveredTooltip?.button === 'delete'} label="Eliminar" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
