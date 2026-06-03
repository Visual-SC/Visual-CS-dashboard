import type { TotalIncomesProps } from './type';

const TotalncomesOptions:React.FC<TotalIncomesProps> = ({isOpen, onSelectPeriod}) => {
  if(!isOpen) return null;

  return (
    <article className="z-10 w-26 h-24 flex flex-col p-1 right-1.5 top-1.5 bg-[#aedbe0]/60 rounded-xl absolute transition-opacity duration-200">
      <button onClick={() => onSelectPeriod('daily')} className="text-p-14 mt-8 text-left bg-medium-blue rounded-md h-6 px-2 font-semibold">Diario</button>
      <button onClick={() => onSelectPeriod('monthly')} className="text-p-14 mt-2 text-left bg-medium-blue rounded-md h-6 px-2 font-semibold">Mensual</button>
    </article>
  )
}

export default TotalncomesOptions
