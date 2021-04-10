import { handleActions } from 'redux-actions';
import { ImageActions } from '../actions';
import { ImageState } from './state';
import { ProductModel } from '../models';
//import { ProductModel } from '../models';

export const productInitialState: ImageState = {
  hasLoadedResultsBefore: false,
  errorMessage: '',
  isLoading: false,
  totalSearchResults: 0,
  searchResults: [],
  searchText: '',
  generalStatus: 'empty',
  selectedProduct: {
    image: {
      small: '',
      large: '',
      extraLarge: ''
    },
    description: '',
    itemlookupcode: '',
    price: 0,
  },
  showSearchInput: false,
  scrollSearchPositionY: 0,
  backText: '',
};

export const imagesReducer = handleActions<ImageState, any>(
  {

    [ImageActions.Type.RESET_SEARCH]: state => {
      return {
        ...state,
        showSearchInput: state.showSearchInput,
        searchText: state.searchText,
      };
    },
    [ImageActions.Type.SEARCH_IMAGES_FAILED]: state => {
      return {
        ...state,
        isLoading: false,
        generalStatus: 'failed',
      };
    },
    [ImageActions.Type.SEARCH_IMAGES_REQUEST]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        currentPage: action.payload.page,
        pageSize: action.payload.pageSize,
        generalStatus: 'requested-search',
      };
    },
    [ImageActions.Type.SEARCH_IMAGES_SUCCESS]: (state, action) => {
      //const results: action.payload.items;
      return {
        ...state,
        hasLoadedResultsBefore: true,
        isLoading: false,
        totalSearchResults: action.payload.totalItems,
        searchResults: action.payload.items,
        generalStatus: action.payload.items.length === 0 ? 'empty-results' : 'full-results',
      };
    },

    [ImageActions.Type.SELECT_IMAGE]: (state, action) => {
      const results: ProductModel = action.payload;
      console.log('results:', results);
      console.log('state:', state);
      return {
        ...state,
        selectedProduct: action.payload
      };
    },

    [ImageActions.Type.SET_SEARCH_TEXT]: (state, action) => {
      return {
        ...state,
        searchText: action.payload,
      };
    },
    [ImageActions.Type.SET_IMAGE_DETAIL_SOURCE]: (state, action) => {
      return {
        ...state,
        imageDetailSource: action.payload,
      };
    },
    [ImageActions.Type.SET_BACK_TEXT]: (state, action) => {
      return {
        ...state,
        backText: action.payload,
      };
    },
    [ImageActions.Type.SET_SHOW_SEARCH_INPUT_TEXT]: (state, action) => {
      return {
        ...state,
        showSearchInput: action.payload,
      };
    },
    [ImageActions.Type.SET_SCROLL_POSITION]: (state, action) => {
      return {
        ...state,
        scrollSearchPositionY: action.payload,
      };
    },

    [ImageActions.Type.RESET_IMAGES_STATE]: (state) => {
      return {
        ...productInitialState
      };
    }
  },
  productInitialState,
);
