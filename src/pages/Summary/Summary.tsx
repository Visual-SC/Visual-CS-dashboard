import DashboardMainCard from "../../components/DashboardMainCard/DashboardMainCard";
import TotalIncomesGraph from "../../components/TotalIncomesGraph/TotalIncomesGraph";
import LastOrders from "../../components/LastOrders/LastOrders";
import TopProducts from "../../components/TopProducts/TopProducts";
import LastEvents from "../../components/LastEvents/LastEvents";
import { DashboardCashData } from "./data";

export default function Summary() {
  return (
    <section className="flex flex-col gap-2 p-2">
      <article className="flex justify-between h-22 max-w-230">
      {
        DashboardCashData.map((card)=>(
          <DashboardMainCard 
            label={card.label}
            image={card.image}
          />
        ))
      }
      </article>
      <article className="grid grid-cols-2 gap-4" style={{ gridTemplateRows: '304px 273px' }}>
        <TotalIncomesGraph />
        <LastOrders />
        <TopProducts />
        <LastEvents />
      </article>  
    </section>
  )
}
