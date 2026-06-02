import type { tooltipProps } from './type';

const Tooltip:React.FC<tooltipProps> = ({showTooltip,label}) => {

  return (
    <span
          className={`absolute left-1/2 -translate-x-1/2 -top-7 bg-[#aedbe0]/80 text-xs 
            px-2 py-1 rounded text-black font-semibold   whitespace-nowrap z-10 transition-opacity duration-200 ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
        >
          {label}
    </span>
  )
}

export default Tooltip
