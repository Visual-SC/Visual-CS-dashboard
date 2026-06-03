import type { LastEventsProps } from './type';
import { Link } from 'react-router-dom';
import { useLastEvents } from './useLastEvents';
import LastEventCard from '../LastEventCard/LastEventCard';

function LastEvents(props: LastEventsProps) {
  const { lastEvents } = useLastEvents();
  const recentOrders = lastEvents.slice(0, 3);

  return (
    <div className="bg-light-blue rounded-lg p-4">
      <header className="flex justify-between">
        <section className="inline-flex w-auto">
          <h3 className="text-p-16 text-dark-green font-semibold">Últimos eventos</h3>
          <img className="ml-4 w-6 h-6" src="./uil_schedule.svg" alt="Últimos eventos Rodson Coffee" />
        </section>
        <Link to={"/eventos"} className="inline-flex w-auto items-center">
          <p className="text-p-16 font-semibold text-dark-green">Ver eventos</p>
          <img src="./akar-icons_link-out-green.svg" className="w-4 h-6 ml-4" alt="Ver eventos Rodson Coffee" />
        </Link>
      </header>
      <p className="text-p-16 text-dark-green">Eventos para el presente mes</p>
      <section>
        {recentOrders.map((order) => (
          <LastEventCard
            key={order._id}
            image={order.image}
            title={order.title}
            date={order.date}
            schedule={order.schedule}
            link={""}
            edit={() => {}}
          />
        ))}
      </section>
    </div>
  )
}

export default LastEvents
