import { SearchResponse } from "../models";
import { getImagesInformation } from "./ImageFormatterHelper";

export class ImagesService {
  //private readonly imagesUrl: string;
  constructor(baseUrl = process.env.API_URL) {
    //this.imagesUrl = `${baseUrl}/api/images`;
  }
  searchImages(keywords: string, page: number, size: number): SearchResponse {
    /*return fetch(
      `${this.imagesUrl}?query=${keywords}&pageNumber=${page}&size=${size}`, 
      { 
        method: 'GET'
      },
    )
    .then(res => res.json())
    .then(responseAsJson => {*/

    return getImagesInformation("");
    //})
    //.catch(error => Promise.reject(error));
  }
}
