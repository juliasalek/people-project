import { Person } from './person.interface';

export interface PersonResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Person[];
}
