import {Injectable} from '@angular/core';
import {Proposal} from './proposal.model';
import {Observable, of} from 'rxjs';
import {SubmissionService} from './submission.service';
import {map} from 'rxjs/operators';
import {ReviewResult} from './reviewResult.enum';
import {Review} from './review.model';
import {PCMember} from './programCommiteeMember.model';
import {User} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {

  constructor(private submissionService: SubmissionService) {
  }

  getProposals(): Observable<Proposal[]> {
    return this.submissionService.getSubmissions().pipe(
      map(submissions => {
        const proposals: Proposal[] = [];
        for (let i = 0; i < 10; i++) {
          proposals.push({
            id: i,
            name: 'name' + i,
            uploadTime: new Date('Fri Dec 08 2019 07:44:57'),
            keywords: ['key1', 'key2'],
            topics: ['t1', 't2'],
            submission: submissions[i],
            reviews: [],
            recommendations: []
          });
        }
        return proposals;
      })
    );
  }

  review(proposal: Proposal, result: ReviewResult): Observable<Proposal> {
    const review = new Review();
    const pcMember = new PCMember();
    const user = new User();
    user.username = localStorage.getItem('username');
    pcMember.user = user;
    review.result = result;
    review.pcMember = pcMember;
    proposal.reviews.push(review);
    return of(proposal);
  }

  recommend(proposal: Proposal, recommendation: string): void {
    proposal.recommendations.push(recommendation);
  }
}
