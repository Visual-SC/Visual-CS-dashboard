import { Route, Routes } from "react-router-dom";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard";
import { useHeaderDashboardSync } from "../../stores/headerDashboradStore/useHeaderDashboard";
import Summary from "../../pages/Summary/Summary";
import Orders from "../../pages/Orders/Orders";
import Products from "../../pages/Products/Products";
import Events from "../../pages/Events/Events";

export default function MainDashboard() {
  useHeaderDashboardSync();

  return (
    <main className="p-2 max-tablet-large:col-start-2 max-tablet-large:col-end-3">
      <HeaderDashboard />
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/resumen" element={<Summary />} />
        <Route path="/ordenes" element={<Orders />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/eventos" element={<Events />} />
      </Routes>
    </main>
  )
}
