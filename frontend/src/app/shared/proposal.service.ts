import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Proposal} from './models/proposal.model';
import {Status} from './models/status.enum';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {

  constructor() {
  }

  getProposals(): Observable<Proposal[]> {
    const proposals: Proposal[] = [];
    for (let i = 0; i < 10; i++) {
      proposals.push({
        status: Status.REVIEW,
        submission: {
          fullPaperUrl: 'full paper URL',
          abstractPaperUrl: 'abstract paper URL',
        },
        name: 'muie' + i,
        uploadTime: new Date()
      });
    }
    proposals.push({
      status: Status.ACCEPTED,
      submission: {
        fullPaperUrl: 'full paper URL',
        abstractPaperUrl: 'abstract paper URL',
      },
      name: 'muie',
      uploadTime: new Date()
    });
    return of(proposals);
  }
}
