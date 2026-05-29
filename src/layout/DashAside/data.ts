import type { NavItem } from './type'; 

export const navItems: NavItem[] = [
  { to: "/resumen", label: "Resumen General", icon: "/carbon_dashboard.svg" },
  { to: "/ordenes", label: "Ordenes", icon: "/stash_invoice.svg" },
  { to: "/productos", label: "Productos", icon: "/hugeicons_coffee-beans.svg" },
  { to: "/eventos", label: "Eventos", icon: "/uil_schedule.svg" },
  { to: "/aplicacion", label: "Ir a aplicación", icon: "/hugeicons_web-access-02.svg" },
]