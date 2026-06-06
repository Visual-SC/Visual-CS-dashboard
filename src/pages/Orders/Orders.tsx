import OrdersTable from "../../components/OrdersTable/OrdersTable";
import TableSelectCard from "../../components/TableSelectCard/TableSelectCard";

export default function Orders() {
  return (
    <section className="flex flex-col gap-6 p-2">
      <TableSelectCard label="fecha"/>
      <OrdersTable orders={[]} />
    </section>
  )
}
