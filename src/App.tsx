import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashAside from './layout/DashAside/DashAside';
import MainDashboard from './layout/MainDashboard/MainDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-cols-[316px_1fr] h-screen">
        <DashAside />
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/resumen" element={<MainDashboard />} />
          <Route path="/ordenes" element={<MainDashboard />} />
          <Route path="/productos" element={<MainDashboard />} />
          <Route path="/eventos" element={<MainDashboard />} />
          <Route path="/aplicacion" element={<MainDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
