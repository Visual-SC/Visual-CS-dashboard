import DashboardMainCard from "../../components/DashboardMainCard/DashboardMainCard";
import TotalIncomesGraph from "../../components/TotalIncomesGraph/TotalIncomesGraph";
import LastOrders from "../../components/LastOrders/LastOrders";
import TopProducts from "../../components/TopProducts/TopProducts";
import LastEvents from "../../components/LastEvents/LastEvents";
import { DashboardCashData } from "./data";

export default function Summary() {
  return (
    <section className="flex flex-col gap-2 p-2  max-cellphone:w-full  max-cellphone:p-0">
      <article className="flex justify-between h-auto w-230 flex-wrap max-tablet-large:h-auto
      max-tablet-large:w-113 max-tablet-large:mx-auto tablet-large:gap-4 max-cellphone:flex-col
      max-cellphone:w-full max-cellphone:items-center max-cellphone:m-0">
      {
        DashboardCashData.map((card)=>(
          <DashboardMainCard 
            label={card.label}
            image={card.image}
          />
        ))
      }
      </article>
      <article className="grid grid-cols-2 gap-4 grid-rows-[304px_273px] max-tablet-large:grid-cols-1
      max-tablet-large:grid-rows-[350px_307px_273px_auto] max-cellphone:grid-rows-[307px_auto_468px_auto]
      max-cellphone:min-h-80">
        <TotalIncomesGraph />
        <LastOrders />
        <TopProducts />
        <LastEvents />
      </article>  
    </section>
  )
}
