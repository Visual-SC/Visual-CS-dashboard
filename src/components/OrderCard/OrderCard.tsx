import { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { formatOrderNumber } from '../../utils/formatOrderNumber';
import type { OrderCardProps } from './types';

const OrderCard = ({ id, numero_orden, cliente, total, estado }: OrderCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <article key={id} className="flex bg-light-dash-green rounded-md mt-2 h-16 px-2">
      <div className="flex flex-col self-center">
        <p className="text-p-16 font-semibold text-black">No. {formatOrderNumber(numero_orden)}</p>
        <p className="text-p-16 font-semibold text-dark-green">{cliente}</p>
      </div>
      <div className="flex flex-col ml-auto self-center">
        <p className="font-antonio text-p-18 font-black">{formatPrice(total)}</p>
        <p className="bg-medium-blue inline-flex text-p-10 h-5 w-20 items-center justify-center rounded-md font-semibold">{estado}</p>
      </div>
      <div className="relative ml-2 w-6 h-6 self-center">
        <button
          className="w-full h-full "
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <img className="w-full h-full" src="./image_edit.svg" />
        </button>
        <span
          className={`absolute left-1/2 -translate-x-1/2 -top-7 bg-[#aedbe0]/80 text-xs 
            px-2 py-1 rounded text-black font-semibold   whitespace-nowrap z-10 transition-opacity duration-200 ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
        >
          Editar orden
        </span>
      </div>
    </article>
  );
};

export default OrderCard;