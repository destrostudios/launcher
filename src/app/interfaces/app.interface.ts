import { Developer } from './developer.interface';
import { Genre } from './genre.interface';

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
