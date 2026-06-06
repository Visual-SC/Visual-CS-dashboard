import { Link } from "react-router-dom"
import { navItems } from '../DashAside/data';
import { useDashAsideCellphone } from './useDashAsideCellphone';
import { useHeaderDashboardSync } from '../../stores/headerDashboradStore/useHeaderDashboard';
import Tooltip from '../../components/Tooltip/Tooltip';
import { useState, forwardRef, useImperativeHandle } from 'react';

export interface DashAsideCellphoneRef {
  toggleAside: () => void;
}

const DashAsideCellphone = forwardRef<DashAsideCellphoneRef>(function DashAsideCellphone(_, ref) {
  const { containerRef, toggleAside } = useDashAsideCellphone();
  const { pathname } = useHeaderDashboardSync();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useImperativeHandle(ref, () => ({
    toggleAside,
  }), [toggleAside]);

  return (
    <aside
      ref={containerRef}
      className="bg-light-dash-green p-4 h-full w-full fixed z-20 top-0 left-0
      max-cellphone:z-30  cellphone:hidden"
      >
      <ul className="flex flex-col items-center gap-6 pt-16">
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
            <li key={item.to} className="w-5/6">
              <Link
                to={item.to}
                className={`item relative inline-flex items-center gap-2 justify-between w-full ${isActive ? 'active' : ''}`}
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
  );
});

export default DashAsideCellphone;