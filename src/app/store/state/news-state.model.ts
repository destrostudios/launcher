import { News } from '../../model/news.model';
import { HttpData } from './http-data.model';

export interface NewsState {
  readonly latestNews: HttpData<News[]>;
}
