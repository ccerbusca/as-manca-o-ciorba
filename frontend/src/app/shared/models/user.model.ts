import {Conference} from './conference.model';

export class User {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
  affiliation: string;
  conferences: Conference[];
}
