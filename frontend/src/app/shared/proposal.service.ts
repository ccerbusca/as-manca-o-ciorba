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
}
