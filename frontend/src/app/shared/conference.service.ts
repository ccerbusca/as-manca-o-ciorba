import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Conference} from './models/conference.model';
import {PCMember} from './models/program-commitee-member.model';
import {Role} from './models/role.enum';
import {User} from './models/user.model';
import {Review} from './models/review.model';
import {Bidding} from './models/bidding.model';
import {map} from 'rxjs/operators';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {

  constructor(private httpClient: HttpClient) {
  }

  getConference(id: number): Observable<Conference> {
    return this.getConferences().pipe(
      map(conferences => conferences.find(conference => conference.id === id))
    );
  }

  getConferences(): Observable<Conference[]> {
    return this.httpClient.get<Conference[]>(`${ConfigService.configuration.backendPath}/api/conferences`).pipe(
      map(conferences => conferences.map(conference => {
        conference.startTime = new Date(conference.startTime);
        conference.resultsDeadline = new Date(conference.resultsDeadline);
        conference.evaluationDeadline = new Date(conference.evaluationDeadline);
        conference.assignmentDeadline = new Date(conference.assignmentDeadline);
        conference.proposalDeadline = new Date(conference.proposalDeadline);
        conference.endTime = new Date(conference.endTime);
        return conference;
      }))
    );
  }

  getConferencesForUser(user: string): Observable<Conference[]> {
    return this.getConferences();
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

  updateConference(conference: Conference): void {
    console.log('update', conference);
  }



}
