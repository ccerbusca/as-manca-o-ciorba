import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Conference} from './models/conference.model';
import {map, tap} from 'rxjs/operators';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {PCMember} from './models/program-commitee-member.model';
import {Proposal} from './models/proposal.model';
import {User} from './models/user.model';
import {Role} from './models/role.enum';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  private readonly conferencesChangedSubject = new ReplaySubject(1);
  private readonly conferencesChanged$ = this.conferencesChangedSubject.asObservable();

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  getConference(id: number): Observable<Conference> {
    return this.getConferences().pipe(
      map(conferences => conferences.find(conference => conference.id === id))
    );
  }

  get conferencesChanged(): Observable<any> {
    return this.conferencesChanged$;
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

  getConferencesForPcMember(user: string): Observable<Conference[]> {
    return this.getConferences().pipe(map(conf => conf.filter(conference =>
      conference.pcMembers.some(member => member.user.username === this.authService.currentUser))));
  }

  getConferencesForUserInterested(user: string): Observable<Conference[]> {
    const interested: Conference[] = [];
    interested.push({
      id: 100,
      title: 'title1',
      generalInfo: 'geninfo1',
      startTime: new Date(),
      endTime: new Date(),
      proposalDeadline: new Date(),
      assignmentDeadline: new Date(),
      evaluationDeadline: new Date(),
      resultsDeadline: new Date(),
      pcMembers: [{
      role: Role.CHAIR,
      personalWebpage: 'personalWebpage1',
      user: {
        id: 100,
        name: 'name',
        username: 'username',
        email: 'example@domain@gmail.com',
        affiliation: 'affiliation'
      }
    }],
      proposals: [],
      interested: [{
          id: 101,
          name: 'name2',
          username: 'username2',
          email: 'example2@anotherdomain@gmail.com',
          affiliation: 'affi2'
      }],
      purchased: []
    });
    return of (interested);
  }

  updateConference(conference: Conference): Observable<Conference> {
    return this.httpClient.put<Conference>(`${ConfigService.configuration.backendPath}/api/conferences`, conference).pipe(
      tap(c => {
        this.conferencesChangedSubject.next();
      })
    );
  }

  createConference(conference: Conference): Observable<Conference> {
    return this.httpClient.post<Conference>(`${ConfigService.configuration.backendPath}/api/conferences`, conference);
  }
}
