import {Role} from './role.enum';
import {User} from './user.model';

export class PCMember {
  role: Role;
  personalWebpage: string;
  user: User;
}
