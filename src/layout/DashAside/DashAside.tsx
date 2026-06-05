import { Link } from "react-router-dom"
import { navItems } from './data';
import { useDashAside } from "./useDashAside";
import { useHeaderDashboardSync } from '../../stores/headerDashboradStore/useHeaderDashboard';

export default function DashAside() {
  const { container, handleClickGSAP } = useDashAside();
  const { pathname } = useHeaderDashboardSync();

  return (
    <aside className="bg-light-dash-green p-4 h-auto max-tablet-large:hidden sticky top-0">
      <ul className="flex flex-col items-center gap-6 fixed" ref={container}>
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
                className={`item relative inline-flex items-center gap-2 justify-between w-69 ${isActive ? 'active' : ''}`}
                onClick={() => handleClickGSAP(index)}
              >
                <div className="relative">
                  <span className="fontA text-dark-green text-p-16 font-semibold">{item.label}</span>
                  <span className="fontB absolute -top-10 left-0 opacity-0 text-dark-green text-h1-32 font-semibold">{item.label}</span>
                </div>
                <img src={item.icon} alt="" className="w-6 h-6" />
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  )
}
