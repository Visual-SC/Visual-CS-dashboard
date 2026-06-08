import { useState, useMemo } from 'react';
import type { OrderTable, OrdersTableProps } from './type';
import { ESTADO_STYLES } from './data';
import { formatPrice } from '../../utils/formatPrice';
import { useDateOrders } from '../../api/useDateorders';
import type { OrderInitial } from '../../../types/order-env';
import Tooltip from '../Tooltip/Tooltip';

function formatToDateString(fecha: Date | string): string {
  if (typeof fecha === 'string') {
    const [year, month, day] = fecha.split('T')[0].split('-');
    return `${year}-${month}-${day}`;
  }
  const d = new Date(fecha);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function transformToOrder(initial: OrderInitial): OrderTable {
  return {
    _id: initial._id,
    numero_orden: initial.numero_orden,
    estado: initial.estado === "completada" ? "Completada" : "Preparando",
    resumen: initial.resumen,
    cliente: initial.cliente,
    fecha: formatToDateString(initial.fecha),
    id: initial._id,
    mesa: String(initial.numero_mesa),
    total: initial.resumen.total,
  };
}

export default function OrdersTable({
  orders: externalOrders,
}: OrdersTableProps) {
  const { orders: fetchedOrders, isLoading, error } = useDateOrders();
  const [ascOrder, setAscOrder] = useState(true);
  const [hoveredTooltip, setHoveredTooltip] = useState<{ orderId: string; button: 'edit' | 'view' | 'delete' } | null>(null);

  const handleToggleOrder = () => setAscOrder(prev => !prev);

  const displayOrders = useMemo(() => {
    const source = externalOrders ?? fetchedOrders.map(transformToOrder);
    const sorted = [...source].sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return ascOrder ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
    return sorted;
  }, [externalOrders, fetchedOrders, ascOrder]);

  if (isLoading && !externalOrders) {
    return <p className="p-4">Cargando ordenes...</p>;
  }

  if (error && !externalOrders) {
    return <p className="p-4 text-red-600">Error: {error}</p>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-md bg-white">
      <table className="w-full text-p-16 table-fixed bg-white">
        <thead className="font-semibold">
          <tr className="bg-light-dash-green text-p-16 text-dark-green">
            <th className=" text-center w-27 cursor-pointer" onClick={handleToggleOrder}>
              <span className="inline-flex items-center gap-1">
                Fecha
                <img src="./lets-icons_sort-arrow.svg" alt="Orden" className={`transition-transform ${ascOrder ? 'rotate-180' : ''}`}/>
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
          {displayOrders.map((order: OrderTable) => (
            <tr
              key={order._id}
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
                      onClick={order.onEdit}
                      aria-label="Editar orden"
                      onMouseEnter={() => setHoveredTooltip({ orderId: order._id, button: 'edit' })}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="h-6 w-6 flex items-center justify-center cursor-pointer"
                    >
                      <img src="./image_edit.svg" alt="Editar" className="h-full w-full" />
                    </button>
                    <Tooltip showTooltip={hoveredTooltip?.orderId === order._id && hoveredTooltip?.button === 'edit'} label="Editar" />
                  </div>
                  <div className="relative">
                    <button
                      onClick={order.onDetail}
                      aria-label="Ver detalle"
                      onMouseEnter={() => setHoveredTooltip({ orderId: order._id, button: 'view' })}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="h-6 w-6 flex items-center justify-center cursor-pointer"
                    >
                      <img src="./stash_invoice.svg" alt="Ver" className="h-full w-full" />
                    </button>
                    <Tooltip showTooltip={hoveredTooltip?.orderId === order._id && hoveredTooltip?.button === 'view'} label="Ver" />
                  </div>
                  <div className="relative">
                    <button
                      onClick={order.onDelete}
                      aria-label="Eliminar orden"
                      onMouseEnter={() => setHoveredTooltip({ orderId: order._id, button: 'delete' })}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="h-6 w-6 flex items-center justify-center cursor-pointer"
                    >
                      <img src="./fluent_delete-16-regular.svg" alt="Eliminar" className="h-full w-full" />
                    </button>
                    <Tooltip showTooltip={hoveredTooltip?.orderId === order._id && hoveredTooltip?.button === 'delete'} label="Eliminar" />
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
