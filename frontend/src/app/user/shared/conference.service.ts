import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Conference} from './conference.model';
import {PCMember} from './programCommiteeMember.model';
import {Role} from './role.enum';
import {User} from './user.model';
import {Review} from './review.model';
import {Bidding} from './bidding.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  constructor() {
  }

  getConference(id: number): Observable<Conference> {
    return this.getConferences().pipe(
      map(conferences => conferences.find(conference => conference.id === id))
    );
  }

  getConferences(): Observable<Conference[]> {
    const conferences: Conference[] = [];
    for (let i = 0; i < 10; i++) {
      conferences.push(this.createConference(i));
    }
    return of(conferences);
  }

  createConference(index: number): Conference {
    let conference: Conference;
    conference = new Conference();
    conference.id = index;
    conference.title = 'Conference' + index;
    conference.startTime = new Date();
    conference.endTime = new Date();
    conference.proposalDeadline = new Date();
    conference.assignmentDeadline = new Date();
    conference.evaluationDeadline = new Date();
    conference.resultsDeadline = new Date();
    conference.generalInfo = 'flkgdfjkgdfjkgjdfngjdkfngjdfgnjdfgdfjkgdfkljgjdfg';
    conference.pcMembers = this.createPcMembers();
    return conference;
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
      user: chair,
      reviews,
      biddings
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
        user,
        reviews,
        biddings
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
        user,
        reviews,
        biddings
      });
    }
    return pcMembers;
  }

  updateConference(conference: Conference): void {
    console.log('update', conference);
  }

}
