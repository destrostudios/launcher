import { News } from '../../interfaces/news.interface';
import { HttpData } from './http-data.interface';

export interface NewsState {
  readonly latestNews: HttpData<News[]>;
}
