// tipado para el componente TableSelectCard

export type TableSelectCardProps = {
  label: string;
};

// tipado para el hook personalizado useTableSelectCard

export interface DayOption {
  id: string;
  fechaOriginal: string;
  fechaFormateada: string;
}

export interface UseTableSelectCardReturn {
  dayOptions: DayOption[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}