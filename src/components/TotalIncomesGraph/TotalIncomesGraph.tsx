import { useState } from 'react';
import TotalncomesOptions from '../TotalIncomesOptions/TotalncomesOptions';
import { useTotalIncomes } from '../../api/useTotalIncomes';
import { useTotalIncomesGraph } from './useTotalIncomesGraph';

function TotalIncomesGraph() {
  const { data, period, setPeriod, isLoading, error } = useTotalIncomes();
  const [showOptions, setShowOptions] = useState(false);
  const { canvasRef } = useTotalIncomesGraph({ data: data ?? undefined, period });

  return (
    <section className="bg-light-blue rounded-xl p-4 relative max-tablet-large:w-5/6 max-tablet-large:justify-self-center
    max-cellphone:w-full max-cellphone:p-2">
      <TotalncomesOptions
        isOpen={showOptions}
        onSelectPeriod={(p) => { setPeriod(p); setShowOptions(false); }}
      />
      <div className="flex items-center justify-between mb-4">
        <header className="flex justify-between w-full">
          <section className="flex w-auto max-cellphone:w-56 max-cellphone:flex-start">
            <h3 className="text-p-16 text-dark-green font-semibold max-cellphone:font-p-14">
              Histórico de Ingresos <span className="max-cellphone:hidden">{period === 'daily' ? ' diarios' : ' mensuales'}</span>
            </h3>
            <img src="./green-money.svg" className="ml-4 max-cellphone:w-8 max-cellphone:h-8" alt="historico de ingresos para Rodson Coffee" />
          </section>
          <button onClick={() => setShowOptions(prev => !prev)} className="h-6 w-6 ml-auto z-20 cursor-pointer">
            <img src="./icon-black-points.svg" />
          </button>
        </header>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Cargando...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="h-[calc(100%-3rem)] max-cellphone:mt-4 max-cellphone:flex max-cellphone:justify-center">
        <canvas ref={canvasRef} className={`h-full max-cellphone:w-full ${data === null ? 'hidden' : ''}`} />
      </div>
    </section>
  );
}

export default TotalIncomesGraph;