import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
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
    return this.http.get<Proposal[]>(`${ConfigService.configuration.backendPath}/proposals/conf/${id}`);
  }

  getProposalByUsername(username: string): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${ConfigService.configuration.backendPath}/api/proposals/${username}`);
  }
  getAcceptedProposalsWithoutReviewers(conferenceId: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${ConfigService.configuration.backendPath}/proposals/conf/${conferenceId}/assign`);
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
    return this.http.post<Proposal>(
      `${ConfigService.configuration.backendPath}/conf/${proposal.conferenceID}/proposals/${proposal.id}/review`, review);
  }

  bid(proposal: Proposal, result: BidResult): Observable<Proposal> {
    const bid = new Bidding();
    bid.result = result;
    bid.username = this.authService.currentUser;
    return this.http.post<Proposal>(
      `${ConfigService.configuration.backendPath}/conf/${proposal.conferenceID}/proposals/${proposal.id}/bid`, bid);
  }
}
