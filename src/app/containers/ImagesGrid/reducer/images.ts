import { handleActions } from 'redux-actions';
import { ImageActions } from '../actions';
import { ImageState } from './state';
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
    image: '',
    description: ''
  },
  selectedIndex: 0,
  showSearchInput: false,
  scrollSearchPositionY: 0,
  backText: '',
  currentPage: 0,
  sortDirection: 1
};

export const imagesReducer = handleActions<ImageState, any>(
  {

    [ImageActions.Type.SORT]: state => {
      //console.log('*state.searchResults', state.searchResults);
      //console.log('*state.sortDirection', state.sortDirection);
      var sortedResults = state.searchResults.sort((a, b) => {
        var nameA = a.description.toLowerCase().replace('<b>', '').replace('</b>', ''),
          nameB = b.description.toLowerCase().replace('<b>', '').replace('</b>', '');
        if (nameA < nameB)
          return -1 * state.sortDirection;
        if (nameA > nameB)
          return 1 * state.sortDirection;
        return 0;
      });
      console.log(sortedResults);
      return {
        ...state,
        searchResults: sortedResults,
        sortDirection: state.sortDirection * -1,
        totalSearchResults: 1 + parseInt(state.totalSearchResults.toString())
      };
    },
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
        currentPage: state.currentPage + 1,
        pageSize: action.payload.pageSize,
        generalStatus: 'requested-search',
      };
    },
    [ImageActions.Type.SEARCH_IMAGES_SUCCESS]: (state, action) => {
      //const results: action.payload.items;
      console.log('action.payload', action.payload);
      return {
        ...state,
        hasLoadedResultsBefore: true,
        isLoading: false,
        totalSearchResults: action.payload.totalSearchResults,
        searchResults: state.searchResults.concat(action.payload.images),
        generalStatus: action.payload.images.length === 0 ? 'empty-results' : 'full-results',
      };
    },

    [ImageActions.Type.SELECT_IMAGE]: (state, action) => {
      return {
        ...state,
        selectedProduct: state.searchResults[action.payload],
        selectedIndex: action.payload
      };
    },

    [ImageActions.Type.CHANGE_IMAGE]: (state, action) => {

      var newIndex = state.selectedIndex + action.payload;
      if (newIndex < 0) newIndex = state.searchResults.length - 1;
      if (newIndex === state.searchResults.length) newIndex = 0;
      return {
        ...state,
        selectedIndex: newIndex,
        selectedProduct: state.searchResults[newIndex]
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
