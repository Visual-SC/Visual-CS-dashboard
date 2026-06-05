import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashAside from './layout/DashAside/DashAside';
import MainDashboard from './layout/MainDashboard/MainDashboard';
import DashAsideTablet from './layout/DashAsideTablet/DashAsidetablet';
import DashAsideCellphone from './layout/DashAsideCellphone/DashAsideCellphone';
import ButtonDashAside from './layout/ButtonDashAside/ButtonDashAside';
import { useRef } from 'react';
import type { DashAsideCellphoneRef } from './layout/DashAsideCellphone/DashAsideCellphone';

function App() {
  const dashCellphoneRef = useRef<DashAsideCellphoneRef>(null);

  return (
    <BrowserRouter> 
      <div className="grid grid-cols-[316px_1fr] min-h-screen max-tablet-large:grid-cols-[88px_1fr] max-cellphone:grid-cols-1">
        <DashAside />  
        <DashAsideTablet />
        <DashAsideCellphone ref={dashCellphoneRef} />
        <ButtonDashAside toggleDashCellphone={() => dashCellphoneRef.current?.toggleAside()} />
          <Routes>
            <Route path="/*" element={<MainDashboard />} />
          </Routes>
       </div> 
    </BrowserRouter>
  );
}

export default App
