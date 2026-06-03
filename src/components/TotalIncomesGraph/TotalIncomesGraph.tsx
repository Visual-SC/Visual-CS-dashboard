import { useState } from 'react';
import TotalncomesOptions from '../TotalIncomesOptions/TotalncomesOptions';
import { useTotalIncomes } from '../../api/useTotalIncomes';
import { useTotalIncomesGraph } from './useTotalIncomesGraph';

function TotalIncomesGraph() {
  const { data, period, setPeriod, isLoading, error } = useTotalIncomes();
  const [showOptions, setShowOptions] = useState(false);
  const { canvasRef } = useTotalIncomesGraph({ data: data ?? undefined, period });

  return (
    <section className="bg-light-blue rounded-xl p-4 relative">
      <TotalncomesOptions
        isOpen={showOptions}
        onSelectPeriod={(p) => { setPeriod(p); setShowOptions(false); }}
      />
      <div className="flex items-center justify-between mb-4">
        <header className="flex justify-between w-full">
          <section className="flex w-auto">
            <h3 className="text-p-16 text-dark-green font-semibold">
              Histórico de {period === 'daily' ? 'Ingresos diarios' : 'Ingresos mensuales'}
            </h3>
            <img src="./green-money.svg" className="ml-4" alt="historico de ingresos para Rodson Coffee" />
          </section>
          <button onClick={() => setShowOptions(prev => !prev)} className="h-6 w-6 ml-auto z-20 cursor-pointer">
            <img src="./icon-black-points.svg" />
          </button>
        </header>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Cargando...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="h-[calc(100%-3rem)]">
        <canvas ref={canvasRef} className={data === null ? 'hidden' : ''} />
      </div>
    </section>
  );
}

export default TotalIncomesGraph;