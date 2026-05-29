import { create } from "zustand";
import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { headerData } from './data';

const routeHeaderMap: Record<string, { label: string; description: string }> = {
    '/': { label: headerData[0].label as string, description: headerData[0].description as string },
    '/resumen': { label: headerData[0].label as string, description: headerData[0].description as string },
    '/ordenes': { label: headerData[1].label as string, description: headerData[1].description as string },
    '/productos': { label: headerData[2].label as string, description: headerData[2].description as string },
    '/eventos': { label: headerData[3].label as string, description: headerData[3].description as string },
};

interface HeaderDashboardState {
    pathname: string;
    label: string;
    description: string;
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalEvents: number;
    setPathname: (pathname: string) => void;
    setHeaderData: (label: string, description: string) => void;
    setTotalRevenue: (value: number) => void;
    setTotalOrders: (value: number) => void;
    setTotalProducts: (value: number) => void;
    setTotalEvents: (value: number) => void;
}

export const useHeaderDashboard = create<HeaderDashboardState>((set) => ({
    pathname: '/',
    label: headerData[0].label as string,
    description: headerData[0].description as string,
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalEvents: 0,
    setPathname: (pathname) => set({ pathname }),
    setHeaderData: (label, description) => set({ label, description }),
    setTotalRevenue: (value) => set({ totalRevenue: value }),
    setTotalOrders: (value) => set({ totalOrders: value }),
    setTotalProducts: (value) => set({ totalProducts: value }),
    setTotalEvents: (value) => set({ totalEvents: value }),
}));

export function useHeaderDashboardSync() {
    const location = useLocation();
    const navigate = useNavigate();
    const setPathname = useHeaderDashboard((state) => state.setPathname);
    const setHeaderData = useHeaderDashboard((state) => state.setHeaderData);

    useEffect(() => {
        setPathname(location.pathname);
        const mapped = routeHeaderMap[location.pathname];
        if (mapped) {
            setHeaderData(mapped.label, mapped.description);
        }
    }, [location.pathname, setPathname, setHeaderData]);

    return { location, navigate, pathname: location.pathname };
}
