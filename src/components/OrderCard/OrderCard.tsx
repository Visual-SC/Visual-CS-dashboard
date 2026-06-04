import { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { formatOrderNumber } from '../../utils/formatOrderNumber';
import type { OrderCardProps } from './types';
import Tooltip from '../Tooltip/Tooltip';

const OrderCard = ({ id, numero_orden, cliente, total, estado }: OrderCardProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <article key={id} className="flex bg-light-dash-green rounded-md mt-2 h-14 px-2
    max-cellphone:min-h-18 max-cellphone:h-auto">
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
        <Tooltip 
        showTooltip={showTooltip}
        label="Editar Orden"
        />
      </div>
    </article>
  );
};

export default OrderCard;