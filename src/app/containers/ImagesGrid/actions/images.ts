import { createAction } from "redux-actions";
import { Dispatch } from "redux";
import { BooksService } from "../services";
import { SearchRequest, SearchResponse, } from "../models";

export namespace ImageActions {
  export enum Type {
    RESET_SEARCH = 'RESET_SEARCH',
    SEARCH_BOOKS_FAILED = 'SEARCH_BOOKS_FAILED',
    SEARCH_BOOKS_REQUEST = 'SEARCH_BOOKS_REQUEST',
    SEARCH_BOOKS_SUCCESS = 'SEARCH_BOOKS_SUCCESS',
    SET_SEARCH_TEXT = 'SET_SEARCH_TEXT',
    SET_SHOW_SEARCH_INPUT_TEXT = 'SET_SHOW_SEARCH_INPUT_TEXT',
    SET_SCROLL_POSITION = 'SET_SCROLL_POSITION',
    SET_BOOK_DETAIL_SOURCE = 'SET_BOOK_DETAIL_SOURCE',
    SET_BACK_TEXT = 'SET_BACK_TEXT',


    SELECT_FROM_BOOK_LIST = 'SELECT_FROM_BOOK_LIST',
    RESET_BOOKS_STATE = 'RESET_BOOKS_STATE'
  }

  export const resetSearch = createAction(
    Type.RESET_SEARCH,
  );

  export const selectFromBookList = createAction<String>(Type.SELECT_FROM_BOOK_LIST);
  export const setShowSearchInput = createAction<boolean>(Type.SET_SHOW_SEARCH_INPUT_TEXT);
  export const setSearchText = createAction<string>(Type.SET_SEARCH_TEXT);
  export const setScrollPosition = createAction<number>(Type.SET_SCROLL_POSITION);
  export const setImageDetailSource = createAction<string>(Type.SET_BOOK_DETAIL_SOURCE);
  export const setBackText = createAction<string>(Type.SET_BACK_TEXT);

  export const searchBooksRequest = createAction<SearchRequest>(Type.SEARCH_BOOKS_REQUEST);
  export const searchBooksFailed = createAction(Type.SEARCH_BOOKS_FAILED);
  export const searchBooksSuccess = createAction<SearchResponse>(Type.SEARCH_BOOKS_SUCCESS);



  export const searchImages = (request: SearchRequest) => {
    return async (dispatch: Dispatch) => {
      dispatch(searchBooksRequest(request));
      try {
        const booksService = new BooksService();

        const { keywords, page, pageSize } = request;

        const response = await booksService.searchBooks(keywords.trim(), page, pageSize);
        dispatch(searchBooksSuccess(response));
      }
      catch (error) {
        console.log(error);
        dispatch(searchBooksFailed());
      }
    };
  }
}

export type ImageActions = Omit<typeof ImageActions, 'Type'>;
