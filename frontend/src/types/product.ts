export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  articleNumber: string;
  imageUrl?: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
} 