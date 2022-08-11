import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Proposal} from './models/proposal.model';
import {ReviewResult} from './models/review-result.enum';
import {Review} from './models/review.model';
import {AuthService} from './auth/auth.service';
import {BidResult} from './models/bid-result.enum';
import {Bidding} from './models/bidding.model';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getProposalsByConferenceId(id: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${ConfigService.configuration.backendPath}/api/proposals/conf/${id}`);
  }

  getProposalByUsername(username: string): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${ConfigService.configuration.backendPath}/api/proposals/${username}`);
  }
  getAcceptedProposalsWithoutReviewers(conferenceId: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${ConfigService.configuration.backendPath}/api/proposals/conf/${conferenceId}/assign`);
  }

  review(proposal: Proposal, result: ReviewResult): Observable<Proposal> {
    const review = new Review();
    review.result = result;
    review.username = localStorage.getItem('username');
    return this.http.post<Proposal>(
      `${ConfigService.configuration.backendPath}/api/conf/${proposal.conferenceID}/proposals/${proposal.id}/review`, review);
  }

  recommend(proposal: Proposal, recommendation: string): Observable<Proposal> {
    const review = proposal.reviews.find(rev => rev.username === this.authService.currentUser);
    review.recommendation = recommendation;
    return this.http.post<Proposal>(
      `${ConfigService.configuration.backendPath}/api/proposals/${proposal.id}/recommend`, review);
  }

  addProposal(proposal: Proposal, confID: number): Observable<Proposal> {
    return this.http.post<Proposal>(
      `${ConfigService.configuration.backendPath}/api/conf/${confID}/proposals`, proposal);
  }

  addReviewToProposal(proposal: Proposal, review: Review): Observable<Proposal> {
    proposal.reviews.push(review);
    return this.http.post<Proposal>(
      `${ConfigService.configuration.backendPath}/api/conf/${proposal.conferenceID}/proposals/${proposal.id}/addreviewer`, review);
  }

  bid(proposal: Proposal, result: BidResult): Observable<Proposal> {
    const bid = new Bidding();
    bid.result = result;
    bid.username = this.authService.currentUser;
    return this.http.post<Proposal>(
      `${ConfigService.configuration.backendPath}/api/conf/${proposal.conferenceID}/proposals/${proposal.id}/bid`, bid);
  }

  getProposalsWithContradictoryReviews(conferenceId: number): Observable<Proposal[]> {
    const proposals: Proposal[] = [];
    proposals.push({
      id: 808,
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
      reviews: [{
        username: 'mihai',
        result: ReviewResult.ACCEPT
      },
        {
          username: 'andrei',
          result: ReviewResult.REJECT
        }],
      name: 'muie1',
      uploadTime: new Date()
    });
    proposals.push({
      id: 188,
      status: Status.ACCEPTED,
      submission: {
        fullPaperUrl: 'full paper URL',
        abstractPaperUrl: 'abstract paper URL',
      },
      reviews: [{
        username: 'mihai',
        result: ReviewResult.ACCEPT
      },
        {
          username: 'andrei',
          result: ReviewResult.REJECT
        }],
      name: 'muie2',
      uploadTime: new Date()
    });
    return of(proposals);
  }

  reviewChair(proposal: Proposal, result: any): Observable<Proposal> {
    // maybe here delete all reviews so there won't be any conflicting ones, and then add chair's review to be the only one
    const review = new Review();
    review.result = result;
    review.username = this.authService.currentUser;
    proposal.reviews.push(review);
    return of(proposal);
  }
}
