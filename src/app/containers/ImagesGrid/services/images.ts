import { getImagesInformation } from "./ImageFormatterHelper";

export class ImagesService {
  //private readonly imagesUrl: string;
  constructor(baseUrl = process.env.API_URL) {
    //this.imagesUrl = `${baseUrl}/api/images`;
  }
  searchImages(keywords: string, page: number, size: number): Promise<any> {
    return fetch(
      'https://image-grid-app2.vercel.app/api/hello.js',
      {
        headers: {
          origin: '*',
          Authorization: 'Bearer sdfsdfdsf',
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'GET'
      },
    )
      .then(res => res.json())
      .then(responseAsJson => {

        return getImagesInformation("");
      })
      .catch(error => Promise.reject(error));
  }
}
