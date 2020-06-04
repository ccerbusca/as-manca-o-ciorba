import {Component, OnInit} from '@angular/core';
import {ProposalService} from '../../../shared/proposal.service';
import {ActivatedRoute} from '@angular/router';
import {Proposal} from '../../../shared/models/proposal.model';
import {MatDialog} from '@angular/material/dialog';
import {AssignReviewersDialogComponent} from './assign-reviewers-dialog/assign-reviewers-dialog.component';
import {AuthService} from '../../../shared/auth/auth.service';
import {User} from '../../../shared/models/user.model';
import {UserService} from '../../../shared/user.service';
import {Conference} from '../../../shared/models/conference.model';
import {ConferenceService} from '../../../shared/conference.service';
import {Role} from '../../../shared/models/role.enum';
import {ReviewResultDialogComponent} from '../../review/review-result-dialog/review-result-dialog.component';


@Component({
  selector: 'app-assign-reviewers',
  templateUrl: './assign-reviewers.component.html',
  styleUrls: ['./assign-reviewers.component.scss']
})
export class AssignReviewersComponent implements OnInit {

  user: User;
  proposals: Proposal[] = [];
  conference: Conference;
  constructor(private proposalService: ProposalService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private authService: AuthService,
              private userService: UserService,
              private conferenceService: ConferenceService,
  ) { }

  ngOnInit(): void {
    const conferenceId = +this.route.snapshot.paramMap.get('id');
    this.userService.getPCMemberByUsername(this.authService.currentUser).subscribe(
      user => this.user = user,
      _ => console.log('not found'));
    this.conferenceService.getConference(conferenceId).subscribe(conf => {
      this.conference = conf;
      this.update();
    });
  }

  update(): void {
    this.proposalService.getAcceptedProposalsWithoutReviewers(this.conference.id).subscribe(proposals => this.proposals = proposals);
    if (this.isCurrentUserChair()) {
      this.proposalService.getProposalsWithContradictoryReviews(this.conference.id).subscribe(proposals => {
        proposals.forEach(prop => this.proposals.push(prop));
      });
    }
  }

  isCurrentUserChair(): boolean {
    return this.conference.pcMembers.filter(pcm => pcm.user.username === this.authService.currentUser).some(pcm => pcm.role === Role.CHAIR);
  }

  assign(proposal: Proposal): void {
    this.dialog.open(AssignReviewersDialogComponent, {
      width: '400px',
      data: {
        proposalBiddings: proposal.biddings,
      }
    }).afterClosed().subscribe(reviews => {
      if (!!reviews) {
        reviews.forEach(review => this.proposalService.addReviewToProposal(proposal, review).subscribe(_ => this.update()));
      }
    });
  }

  hasContradictoryReviews(proposal: Proposal): boolean {
    if (proposal.reviews === undefined ) {
      return false;
    }
    return proposal.reviews.length > 0; // if it has reviews then they are contradictory
  }
  openReviewDialog(proposal: Proposal): void {
    this.dialog.open(ReviewResultDialogComponent,
      {width: '1000px'})
      .afterClosed().subscribe(result => {
      if (!!result) {
        this.proposalService.reviewChair(proposal, result).subscribe(reviewedProposal => {
          this.proposals.map(p => p.id === reviewedProposal.id ? reviewedProposal : p);
        });
      }
    });
  }
}
