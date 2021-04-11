
export class ImagesService {
  constructor(baseUrl = process.env.API_URL) {
  }
  searchImages(keywords: string, page: number, size: number): Promise<any> {
    return fetch(
      `https://image-grid-app2.vercel.app/api/hello.js?keywords=${keywords}&page=${page}`,
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

      .catch(error => Promise.reject(error));
  }
}
