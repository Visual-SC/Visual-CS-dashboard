export const formatPrice = (price: number): string => {
  return price.toLocaleString("es-CO", { style: "currency", currency: "COP" }).replace("COP", "").trim();
};