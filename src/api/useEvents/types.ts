export interface EventItem {
  _id: string;
  date: string;
  title: string;
  description: string[];
  price: number;
  schedule: string;
  whatsapp: string;
  image: string;
}

export interface EventsResponse {
  status: string;
  message: string;
  data: EventItem[];
}