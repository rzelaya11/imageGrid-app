import { HttpService } from '../services/httpService';

export class SearchService {
  private readonly searchUrl: string;
  private readonly httpService: HttpService;
  constructor(baseUrl = process.env.API_URL) {
    this.searchUrl = `${baseUrl}/api/search`;
    this.httpService = new HttpService();
  }

  async getAllImages(filteredBy?: SearchRequest): Promise<string> {
    const response = await this.httpService.get(this.searchUrl, {
      params: {
        filter: filteredBy,
      },
    });
    return response;
  }

}

export interface SearchRequest {
  query: string;
  startRecord: number;
  endRecord: number;
}
