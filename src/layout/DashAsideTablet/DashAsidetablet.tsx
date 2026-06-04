import { Link } from "react-router-dom"
import { navItems } from '../DashAside/data';
import { useDashAsideTablet } from './useDashAsideTablet';
import { useHeaderDashboardSync } from '../../stores/headerDashboradStore/useHeaderDashboard';
import Tooltip from '../../components/Tooltip/Tooltip';
import { useState } from 'react';

export default function DashAsideTablet() {
  const { containerRef, arrowRef, toggleAside } = useDashAsideTablet();
  const { pathname } = useHeaderDashboardSync();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

return (
    <aside
      ref={containerRef}
      className="bg-light-dash-green p-4 h-full w-93.5 fixed z-20 top-0 -left-76 tablet-large:hidden
      max-cellphone:hidden"
    >
    <button
        onClick={toggleAside}
        className="w-11 h-11 mb-4 inline-flex items-center justify-center
        bg-medium-blue rounded-full absolute right-4 top-6"
        aria-label="Menu"
      >
        <img ref={arrowRef} className="w-6 h-6" src="./right-arrow.svg" />
      </button>
      <ul className="flex flex-col items-center gap-6">
        <li>
          <Link to="/">
            <img
              src="/Logo-principal-Rodson-Coffee.png"
              alt="Rodson Coffee"
              className="w-41 h-auto"
            />
          </Link>
        </li>
        {navItems.map((item, index) => {
          const isActive = pathname === item.to;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`item relative inline-flex items-center gap-2 justify-between w-81 ${isActive ? 'active' : ''}`}
                onClick={toggleAside}
              >
                <div className="relative">
                  <span className="fontA text-dark-green text-p-16 font-semibold">{item.label}</span>
                  <span className="fontB absolute -top-10 left-0 opacity-0 text-dark-green text-h1-32 font-semibold">{item.label}</span>
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img src={item.icon} alt="" className="w-6 h-6" />
                  <Tooltip showTooltip={hoveredIndex === index} label={item.label} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  )
}
