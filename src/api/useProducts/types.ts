export interface ProductItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  status: boolean;
}

export interface ProductsResponse {
  status: string;
  message: string;
  data: ProductItem[];
}