
export class ImagesService {
  constructor(baseUrl = process.env.API_URL) {
  }
  searchImages(keywords: string, page: number, size: number): Promise<any> {
    return fetch(
      `https://image-grid-app2.vercel.app/api/hello.js?keywords=${keywords}`,
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

        return {
          totalItems: 20,
          items: responseAsJson
        };
      })
      .catch(error => Promise.reject(error));
  }
}
