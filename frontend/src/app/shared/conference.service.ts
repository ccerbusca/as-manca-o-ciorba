import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Conference} from './models/conference.model';
import {map, tap} from 'rxjs/operators';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  private readonly conferencesChangedSubject = new ReplaySubject(1);
  private readonly conferencesChanged$ = this.conferencesChangedSubject.asObservable();

  constructor(private httpClient: HttpClient) {
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

  getConferencesForUser(user: string): Observable<Conference[]> {
    return this.getConferences();
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
