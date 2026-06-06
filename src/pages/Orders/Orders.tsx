import { useTotalOrders } from "../../api/useTotalOrders";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import TableSelectCard from "../../components/TableSelectCard/TableSelectCard";
import type { OrderTable } from "../../components/OrdersTable/type";
import type { OrderInitial } from "../../../types/order-env";

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

export default function Orders() {
  const { data: orders, isLoading, error } = useTotalOrders();
  const transformedOrders = orders?.map(transformToOrder) ?? [];

  return (
    <section className="flex flex-col gap-6 p-2">
      <TableSelectCard label="fecha" />
      {isLoading && <p>Cargando ordenes...</p>}
      {error && <p>Error: {error}</p>}
      <OrdersTable orders={transformedOrders} />
    </section>
  )
}
