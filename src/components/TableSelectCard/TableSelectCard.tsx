import type { TableSelectCardProps } from './type';

const TableSelectCard: React.FC<TableSelectCardProps> = ({
  label,
  dayOptions,
  selectedDate,
  selectDate,
  isLoading,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-p-16 text-dark-green font-semibold">{label}</label>
      <select
        name="opciones"
        id="opciones"
        value={selectedDate ?? ""}
        onChange={(e) => selectDate(e.target.value)}
        className="bg-light-dash-green rounded-md w-46 h-12 border-none p-0 cursor-pointer
        text-p-16 text-dark-green font-semibold"
      >
        {isLoading && (
          <option value="" className="bg-light-dash text-p-16 text-dark-green font-semibold">
            Cargando...
          </option>
        )}
        {error && (
          <option value="" className="bg-light-dash text-p-16 text-dark-green font-semibold">
            Error al cargar
          </option>
        )}
        {!isLoading && !error && dayOptions.length === 0 && (
          <option value="" className="bg-light-dash text-p-16 text-dark-green font-semibold">
            Sin datos
          </option>
        )}
        {!isLoading && !error && dayOptions.map((day) => (
          <option
            key={day.id}
            value={day.fechaOriginal}
            className="bg-light-dash text-p-16 text-dark-green font-semibold"
          >
            {day.fechaFormateada}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableSelectCard;