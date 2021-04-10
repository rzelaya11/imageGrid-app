import { createAction } from "redux-actions";
import { Dispatch } from "redux";
import { ImagesService } from "../services";
import { SearchRequest, SearchResponse } from "../models";

export namespace ImageActions {
  export enum Type {
    RESET_SEARCH = 'RESET_SEARCH',
    SEARCH_IMAGES_FAILED = 'SEARCH_IMAGES_FAILED',
    SEARCH_IMAGES_REQUEST = 'SEARCH_IMAGES_REQUEST',
    SEARCH_IMAGES_SUCCESS = 'SEARCH_IMAGES_SUCCESS',
    SET_SEARCH_TEXT = 'SET_SEARCH_TEXT',
    SET_SHOW_SEARCH_INPUT_TEXT = 'SET_SHOW_SEARCH_INPUT_TEXT',
    SET_SCROLL_POSITION = 'SET_SCROLL_POSITION',
    SET_IMAGE_DETAIL_SOURCE = 'SET_IMAGE_DETAIL_SOURCE',
    SET_BACK_TEXT = 'SET_BACK_TEXT',
    SELECT_IMAGE = "SELECT_IMAGE",
    CHANGE_IMAGE = "CHANGE_IMAGE",
    RESET_IMAGES_STATE = 'RESET_IMAGES_STATE'
  }

  export const resetSearch = createAction(
    Type.RESET_SEARCH,
  );

  export const setShowSearchInput = createAction<boolean>(Type.SET_SHOW_SEARCH_INPUT_TEXT);
  export const setSearchText = createAction<string>(Type.SET_SEARCH_TEXT);
  export const setScrollPosition = createAction<number>(Type.SET_SCROLL_POSITION);
  export const setImageDetailSource = createAction<string>(Type.SET_IMAGE_DETAIL_SOURCE);
  export const setBackText = createAction<string>(Type.SET_BACK_TEXT);

  export const searchImagesRequest = createAction<SearchRequest>(Type.SEARCH_IMAGES_REQUEST);
  export const searchImagesFailed = createAction(Type.SEARCH_IMAGES_FAILED);
  export const searchImagesSuccess = createAction<SearchResponse>(Type.SEARCH_IMAGES_SUCCESS);

  export const selectImage = createAction<number>(Type.SELECT_IMAGE);
  export const changeImage = createAction<number>(Type.CHANGE_IMAGE);


  export const searchImages = (request: SearchRequest) => {
    return async (dispatch: Dispatch) => {
      dispatch(searchImagesRequest(request));
      try {
        const imagesService = new ImagesService();

        const { keywords, page, pageSize } = request;

        const response = await imagesService.searchImages(keywords.trim(), page, pageSize);
        console.log(response);
        dispatch(searchImagesSuccess(response));
      }
      catch (error) {
        console.log(error);
        dispatch(searchImagesFailed());
      }
    };
  }
}

export type ImageActions = Omit<typeof ImageActions, 'Type'>;
