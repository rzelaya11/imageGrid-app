export interface ImageModel {
  small: string;
  large: string;
  extraLarge: string;
}


export interface ProductModel {
  image: ImageModel;
  description: string;
  itemlookupcode: string;
  price: number;
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