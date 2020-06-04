import { Component, OnInit } from '@angular/core';
import {ProposalService} from '../../../shared/proposal.service';
import {ActivatedRoute} from '@angular/router';
import {Proposal} from '../../../shared/models/proposal.model';
import {MatDialog} from '@angular/material/dialog';
import {AssignReviewersDialogComponent} from './assign-reviewers-dialog/assign-reviewers-dialog.component';
import {Bidding} from '../../../shared/models/bidding.model';



@Component({
  selector: 'app-assign-reviewers',
  templateUrl: './assign-reviewers.component.html',
  styleUrls: ['./assign-reviewers.component.scss']
})
export class AssignReviewersComponent implements OnInit {

  proposals: Proposal[];
  conferenceId: number;
  constructor(private proposalService: ProposalService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
      this.update();
  }

  update(): void {
    this.conferenceId = +this.route.snapshot.paramMap.get('id');
    this.proposalService.getAcceptedProposalsWithoutReviewers(this.conferenceId).subscribe(proposals => this.proposals = proposals);
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
}
