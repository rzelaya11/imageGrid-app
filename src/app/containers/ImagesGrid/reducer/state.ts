
import { ProductModel, } from "../models";

export interface ImageState {
  hasLoadedResultsBefore: boolean;
  isLoading: boolean;
  errorMessage: string;
  totalSearchResults: number;
  searchResults: Array<ProductModel>;
  searchText: string;
  generalStatus: string;
  selectedProduct: ProductModel;
  showSearchInput: boolean;
  scrollSearchPositionY: number;
  backText: string;
}



