export function formatToDateString(fecha: Date | string): string {
  if (typeof fecha === 'string') {
    console.log(fecha);
    const [year, month, day] = fecha.split('T')[0].split('-');
    return `${year}-${month}-${day}`;
  }
  const d = new Date(fecha);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}