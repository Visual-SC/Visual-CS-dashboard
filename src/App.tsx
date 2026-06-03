import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashAside from './layout/DashAside/DashAside';
import MainDashboard from './layout/MainDashboard/MainDashboard';
import DashAsideTablet from './layout/DashAsideTablet/DashAsidetablet';

function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-cols-[316px_1fr] h-screen max-tablet-large:grid-cols-[88px_1fr]">
        <DashAside />
        <DashAsideTablet />
        <Routes>
          <Route path="/*" element={<MainDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
