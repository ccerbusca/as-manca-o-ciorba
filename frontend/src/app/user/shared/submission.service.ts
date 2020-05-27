import {Injectable} from '@angular/core';
import {Submission} from './submission.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {

  constructor() {
  }

  getSubmissions(): Observable<Submission[]> {
    const submissions: Submission[] = [];
    for (let i = 0; i < 10; i++) {
      submissions.push({
        title: 'title' + i,
        fullPaperUrl: 'full paper URL',
        abstractPaperUrl: 'abstract paper URL',
        status: 'awaiting review',
        recommendation: '0'
      });
    }
    submissions.push({
      title: 'test',
      fullPaperUrl: 'test',
      abstractPaperUrl: 'test',
      status: 'accepted',
      recommendation: 'NICE'
    });
    return of(submissions);
  }
}
