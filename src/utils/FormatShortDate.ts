export class FormaShortDate {
  static format(date: Date | string): string {
    const initdate = typeof date === 'string' ? new Date(date) : date;
    const year = initdate.getFullYear();
    const month = String(initdate.getMonth() + 1).padStart(2, '0');
    const day = String(initdate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}