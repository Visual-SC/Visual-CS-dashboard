import DashboardMainCard from "../../components/DashboardMainCard/DashboardMainCard";
import TotalIncomesGraph from "../../components/TotalIncomesGraph/TotalIncomesGraph";
import LastOrders from "../../components/LastOrders/LastOrders";
import TopProducts from "../../components/TopProducts/TopProducts";
import LastEvents from "../../components/LastEvents/LastEvents";
import { DashboardCashData } from "./data";

export default function Summary() {
  return (
    <section className="flex flex-col gap-6 p-2 max-w-230 ">
      <article className="flex justify-between h-22">
      {
        DashboardCashData.map((card)=>(
          <DashboardMainCard 
            label={card.label}
            image={card.image}
          />
        ))
      }
      </article>
      <article className="grid grid-cols-2 grid-rows-2 gap-4">
        <TotalIncomesGraph />
        <LastOrders />
        <TopProducts />
        <LastEvents />
      </article>  
    </section>
  )
}
