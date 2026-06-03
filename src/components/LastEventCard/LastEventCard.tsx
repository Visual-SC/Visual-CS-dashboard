import { useState } from 'react';
import type { LastEventCardProps } from "./type";
import { Link } from "react-router-dom";
import Tooltip from '../Tooltip/Tooltip';

export default function LastEventCard({ image, title, date, schedule, link, edit }: LastEventCardProps) {
  const [showTooltipLink, setShowTooltipLink] = useState(false);
  const [showTooltipEdit, setShowTooltipEdit] = useState(false);

  return (
    <article className="bg-light-dash-green rounded-md mt-2 h-19 px-2 py-1 flex items-center p-1 justify-between">
      <div className="grid grid-cols-[76px_1fr] grid-rows-3 h-full">
        <img src={image} alt={title} className="row-span-3 row-start-1 row-end-3 w-19 h-full object-cover rounded-md align-self-center justify-self-center" />
        <h1 className="row-start-1 row-end-2 col-start-2 col-end-3 text-p-16 font-semibold text-dark-blue truncate">{title}</h1>
        <p className="row-start-2 row-end-3 col-start-2 col-end-3 text-p-14 font-medium text-gray-600">{new Date(date).toLocaleDateString()}</p>
        <p className="row-start-3 row-end-4 col-start-2 col-end-3 text-p-14 font-medium text-gray-600">{schedule}</p>
      </div>
      <div className="flex w-14 justify-between">
        <div className="relative w-6 h-6">
          <Link
            to={link}
            className="w-full h-full block"
            onMouseEnter={() => setShowTooltipLink(true)}
            onMouseLeave={() => setShowTooltipLink(false)}
          >
            <img src="./line-md_link.svg" alt={title}/>
          </Link>
          <Tooltip showTooltip={showTooltipLink} label="Link" />
        </div>
        <div className="relative w-6 h-6">
          <button
            onClick={edit}
            className="w-full h-full"
            onMouseEnter={() => setShowTooltipEdit(true)}
            onMouseLeave={() => setShowTooltipEdit(false)}
          >
            <img src="./image_edit.svg" alt={title}/>
          </button>
          <Tooltip showTooltip={showTooltipEdit} label="Editar evento" />
        </div>
      </div>
    </article>
  )
}
