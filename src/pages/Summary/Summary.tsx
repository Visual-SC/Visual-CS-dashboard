import DashboardMainCard from "../../components/DashboardMainCard/DashboardMainCard";
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
    </section>
  )
}
