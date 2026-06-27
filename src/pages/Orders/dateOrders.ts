import type { OrderTable } from "../../components/OrdersTable/type";
import type { OrderInitial } from '../../../types/order-env';
import { formatToDateString } from '../../utils/formatToDateString';
import { useDateOrders } from "../../api/useDateorders";
import { useMemo } from "react";
import { FormatDate } from "../../utils/FormatDate";
import type { DayOption } from "../../components/TableSelectCard/type";

export const FormatOrders = (initial: OrderInitial): OrderTable =>{
    return {
    _id: initial._id,
    numero_orden: initial.numero_orden,
    estado: initial.estado === "completada" ? "Completada" : "Preparando",
    resumen: initial.resumen,
    cliente: initial.cliente,
    fecha: formatToDateString(initial.fecha),
    id: initial._id,
    mesa: String(initial.numero_mesa),
    total: initial.resumen.total,
  };
}

export function useDateOrdersData(){
  const {
    selectedDate,    
    orders,
    availableDays,
    selectDate,
    isLoading,
    error
  } = useDateOrders();

    const dayOptions: DayOption[] = useMemo(() => {
    return availableDays.map((dateString) => {
      const [year, month, day] = dateString.split("-");
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      const formateada = new FormatDate(date).toSpanishFormat();
    
      return {
        id: dateString,
        fechaOriginal: dateString,
        fechaFormateada: formateada,
      };
    });
  }, [availableDays]);

  const transformedOrders = useMemo(() => {
    return Array.isArray(orders) ? orders.map(FormatOrders) : [];
  }, [orders]);

  return { dayOptions,transformedOrders,selectedDate,selectDate,isLoading,error };
}

