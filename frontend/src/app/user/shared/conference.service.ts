import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Conference} from './conference.model';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  constructor(private userService: UserService) {
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
    conference.password = 'opt';
    conference.generalInfo = 'adsfvfadvjafd dsafdasgf';
    conference.title = 'Conference' + index;
    conference.startTime = new Date();
    conference.endTime = new Date();
    conference.proposalDeadline = new Date();
    conference.assignmentDeadline = new Date();
    conference.evaluationDeadline = new Date();
    conference.resultsDeadline = new Date();
    this.userService.getPCMembers().subscribe(members => conference.pcMembers = members);
    return conference;
  }

}
