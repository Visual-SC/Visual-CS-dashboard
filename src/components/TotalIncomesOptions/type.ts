import type { Period } from '../../api/useTotalIncomes/types';

export type TotalIncomesProps = {
    isOpen: boolean;
    onSelectPeriod: (period: Period) => void;
}