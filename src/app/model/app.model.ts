import { Developer } from './developer.model';
import { Genre } from './genre.model';

export interface App {
  readonly id: number;
  readonly name: string;
  readonly developer: Developer;
  readonly genres: Genre[];
  readonly date: string;
  readonly description: string;
  readonly executable: string;
  readonly hidden: boolean;
}
