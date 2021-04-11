
export interface ProductModel {
  image: string;
  description: string;
}

export interface SearchResponse {
  items: Array<ProductModel>;
  totalItems: number;
}

export interface SearchRequest {
  keywords: string;
  page: number;
  pageSize: number;
}