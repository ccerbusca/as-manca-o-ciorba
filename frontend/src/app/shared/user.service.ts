import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PCMember} from './models/program-commitee-member.model';
import {User} from './models/user.model';
import {Review} from './models/review.model';
import {Bidding} from './models/bidding.model';
import {Role} from './models/role.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {
  }

  getPCMembers(): Observable<PCMember[]> {
    return of(this.createPcMembers());
  }

  createPcMembers(): PCMember[] {
    const pcMembers: PCMember[] = [];

    const chair: User = new User();
    chair.name = 'boss';
    chair.username = 'boss';
    chair.email = 'boss@asMancaOCiorba.pl';
    chair.password = 'dada';
    chair.affiliation = '_|_';
    let reviews: Review[] = [];
    let biddings: Bidding[] = [];
    pcMembers.push({
      role: Role.CHAIR,
      personalWebpage: 'www.page.pl',
      user: chair
    });
    for (let i = 0; i < 3; i++) {
      const user: User = new User();
      user.name = 'coch' + i;
      user.username = 'cochair' + i;
      user.email = 'coch' + i + '@asMancaOCiorba.pl';
      user.password = 'dada';
      user.affiliation = '_|_';
      reviews = [];
      biddings = [];
      const bidding: Bidding = new Bidding();
      biddings.push(bidding);
      pcMembers.push({
        role: Role.CO_CHAIR,
        personalWebpage: 'www.page' + i + '.pl',
        user
      });
    }
    for (let i = 0; i < 5; i++) {
      const user: User = new User();
      user.name = 'mem' + i;
      user.username = 'member' + i;
      user.email = 'mem' + i + '@asMancaOCiorba.pl';
      user.password = 'dada';
      user.affiliation = '_|_';
      reviews = [];
      biddings = [];
      const review: Review = new Review();
      reviews.push(review);
      pcMembers.push({
        role: Role.MEMBER,
        personalWebpage: 'www.page' + i + '.pl',
        user
      });
    }
    return pcMembers;
  }
}
