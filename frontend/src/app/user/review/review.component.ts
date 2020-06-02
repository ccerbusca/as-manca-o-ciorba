import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {Proposal} from '../shared/proposal.model';
import {MatTableDataSource} from '@angular/material/table';
import {ProposalService} from '../shared/proposal.service';
import {MatDialog} from '@angular/material/dialog';
import {ReviewResultDialogComponent} from './review-result-dialog/review-result-dialog.component';
import {ReviewRecommendationDialogComponent} from './review-recommendation-dialog/review-recommendation-dialog.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  proposals: Proposal[];
  dataSource: MatTableDataSource<Proposal>;
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private proposalService: ProposalService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.proposalService.getProposals()
      .subscribe(proposals => {
        this.proposals = proposals;
        this.dataSource = new MatTableDataSource(this.proposals);
        this.dataSource.sort = this.sort;
      });
  }

  isAuthorOf(proposal: Proposal): boolean {

    return !proposal.reviews.some(review => review.pcMember.user.username === localStorage.getItem('username'));
  }

  openReviewDialog(proposal: Proposal): void {
    this.dialog.open(ReviewResultDialogComponent,
      {width: '1000px'})
      .afterClosed().subscribe(result => {
      if (!!result) {
        this.proposalService.review(proposal, result).subscribe(reviewedProposal => {
          this.proposals.map(p => p.id === reviewedProposal.id ? reviewedProposal : p);
        });
      }
    });
  }

  openRecommendationDialog(proposal: Proposal): void {
    this.dialog.open(ReviewRecommendationDialogComponent,
      {width: '600px'})
      .afterClosed().subscribe(recommendation => {
      if (!!recommendation) {
        this.proposalService.recommend(proposal, recommendation);
        // should remove the proposal from the list
      }
    });
  }

  remove(proposal: any): void {
    // should remove the proposal from the list
  }
}
