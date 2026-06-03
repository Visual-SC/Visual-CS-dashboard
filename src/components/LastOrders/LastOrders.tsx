import { Link } from 'react-router-dom';
import type { LastOrdersProps } from './type';
import { useTotalOrders } from '../../api/getTotalOrders';

import OrderCard from '../OrderCard/OrderCard';

function LastOrders(props: LastOrdersProps) {
  const { data, isLoading, error } = useTotalOrders();

  const lastFourOrders = data?.data
    ? [...data.data]
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        .slice(0, 4)
    : [];

  return (
    <div className="bg-light-blue rounded-lg p-4">
      <header className="flex justify-between">
        <section className="inline-flex w-auto">
          <h3 className="text-p-16 text-dark-green font-semibold">Ultimas Ordenes</h3>
          <img className="ml-4 w-6 h-6" src="./stash_invoice.svg" alt="Ultimas ordenes Rodson Coffee" />
        </section>
        <Link to={"/ordenes"} className="inline-flex w-auto items-center">
          <p className="text-p-16 font-semibold text-dark-green">Ver ordenes</p>
          <img src="./akar-icons_link-out-green.svg" className="w-4 h-6 ml-4" alt="Ver ordenes Rodson Coffee" />
        </Link>
      </header>
      <section>
        {isLoading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          lastFourOrders.map((order) => (
            <OrderCard
              key={order._id}
              id={order._id}
              numero_orden={order.numero_orden}
              cliente={order.cliente}
              total={order.resumen.total}
              estado={order.estado}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default LastOrders;
