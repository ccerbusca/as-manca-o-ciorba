import {Role} from './role.enum';
import {User} from './user.model';
import {Review} from './review.model';
import {Bidding} from './bidding.model';

export class PCMember {
  role: Role;
  personalWebpage: string;
  user: User;
  reviews: Review[];
  biddings: Bidding[];
}
