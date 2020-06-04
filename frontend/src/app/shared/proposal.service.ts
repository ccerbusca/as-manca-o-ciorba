import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Proposal} from './models/proposal.model';
import {Status} from './models/status.enum';
import {ReviewResult} from './models/review-result.enum';
import {Review} from './models/review.model';
import {AuthService} from './auth/auth.service';
import {map} from 'rxjs/operators';
import {BidResult} from './models/bid-result.enum';
import {Bidding} from './models/bidding.model';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {

  constructor(private authService: AuthService) {
  }

  getProposalsByConferenceId(id: number): Observable<Proposal[]> {
    return this.getProposals().pipe(
      map(proposals => proposals.filter(p => p.conferenceID === id))
    );
  }

  getProposals(): Observable<Proposal[]> {
    const proposals: Proposal[] = [];
    for (let i = 0; i < 10; i++) {
      proposals.push({
        id: i,
        status: Status.REVIEW,
        submission: {
          fullPaperUrl: 'full paper URL',
          abstractPaperUrl: 'abstract paper URL',
        },
        name: 'muie' + i,
        uploadTime: new Date(),
        conferenceID: 7,
        reviews: [],
        biddings: []
      });
    }
    proposals.push({
      id: 23,
      status: Status.ACCEPTED,
      submission: {
        fullPaperUrl: 'full paper URL',
        abstractPaperUrl: 'abstract paper URL',
      },
      name: 'muie',
      uploadTime: new Date(),
      conferenceID: 5,
      reviews: [],
      biddings: [],
    });
    return of(proposals);
  }
  getAcceptedProposalsWithoutReviewers(conferenceId: number): Observable<Proposal[]> {
    const proposals: Proposal[] = [];
    proposals.push({
      id: 806,
      status: Status.ACCEPTED,
      biddings: [
        {
        result: BidResult.NEUTRAL,
        username: 'mihai'
        },
        {
          result: BidResult.PLEASED,
          username: 'andrei'
        }
      ],
      submission: {
        fullPaperUrl: 'full paper URL',
        abstractPaperUrl: 'abstract paper URL',
      },
      name: 'muie1',
      uploadTime: new Date()
    });
    proposals.push({
                   id: 104,
                   status: Status.ACCEPTED,
                   submission: {
                     fullPaperUrl: 'full paper URL',
                     abstractPaperUrl: 'abstract paper URL',
                   },
                   name: 'muie2',
                   uploadTime: new Date()
    });
    return of(proposals);
  }

  review(proposal: Proposal, result: ReviewResult): Observable<Proposal> {
    const review = new Review();
    review.result = result;
    review.username = localStorage.getItem('username');
    proposal.reviews.push(review);
    return of(proposal);
  }

  recommend(proposal: Proposal, recommendation: string): Observable<Proposal> {
    const review = proposal.reviews.find(rev => rev.username === this.authService.currentUser);
    review.recommendation = recommendation;
    return of(proposal);
  }

  addReviewToProposal(proposal: Proposal, review: Review): Observable<Proposal> {
    proposal.reviews.push(review);
    return of(proposal);
  }

  bid(proposal: Proposal, result: any): Observable<Proposal> {
    const bid = new Bidding();
    bid.result = result;
    bid.username = this.authService.currentUser;
    proposal.biddings.push(bid);
    return of(proposal);
  }
}
