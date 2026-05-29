export class FormatDate {
  private date: Date;

  constructor(date: Date = new Date()) {
    this.date = date;
  }

  toSpanishFormat(): string {
    const day = this.date.getDate();
    const month = this.date.toLocaleDateString("es-ES", { month: "long" });
    const year = this.date.getFullYear();
    return `${day} de ${month} de ${year}`;
  }
}
