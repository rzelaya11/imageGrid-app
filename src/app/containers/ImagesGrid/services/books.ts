import { SearchResponse } from "../models";
import { getImagesInformation } from "./ImageFormatterHelper";

export class BooksService {
  //private readonly booksUrl: string;
  constructor(baseUrl = process.env.API_URL) {
    //this.booksUrl = `${baseUrl}/api/books`;
  }
  searchBooks(keywords: string, page: number, size: number): SearchResponse {
    /*return fetch(
      `${this.booksUrl}?query=${keywords}&pageNumber=${page}&size=${size}`, 
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
