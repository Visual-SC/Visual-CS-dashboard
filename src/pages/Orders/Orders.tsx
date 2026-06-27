import OrdersTable from "../../components/OrdersTable/OrdersTable";
import TableSelectCard from "../../components/TableSelectCard/TableSelectCard";
import { useDateOrdersData } from './dateOrders';


export default function Orders() {
  const {
    dayOptions,
    transformedOrders,
    selectedDate,
    selectDate,
    isLoading,
    error,
  } = useDateOrdersData();

  return (
    <section className="flex flex-col gap-6 p-2">
      <TableSelectCard
        label="fecha"
        dayOptions={dayOptions}
        selectedDate={selectedDate}
        selectDate={selectDate}
        isLoading={isLoading}
        error={error}
      />
      {isLoading && <p>Cargando ordenes...</p>}
      {error && <p>Error: {error}</p>}
      <OrdersTable orders={transformedOrders} />
    </section>
  )
}
