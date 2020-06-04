import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ReviewResultDialogComponent} from './review-result-dialog/review-result-dialog.component';
import {ReviewRecommendationDialogComponent} from './review-recommendation-dialog/review-recommendation-dialog.component';
import {Proposal} from '../../shared/models/proposal.model';
import {ProposalService} from '../../shared/proposal.service';
import {AuthService} from '../../shared/auth/auth.service';
import {ActivatedRoute} from '@angular/router';

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
              private authService: AuthService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.proposalService.getProposalsByConferenceId(id)
      .subscribe(proposals => {
        this.proposals = proposals;
        this.dataSource = new MatTableDataSource(this.proposals);
        this.dataSource.sort = this.sort;
      });
  }

  isAuthorOf(proposal: Proposal): boolean {
    return !proposal.reviews.some(review => review.username === this.authService.currentUser);
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
        this.proposalService.recommend(proposal, recommendation).subscribe(prop => this.remove(prop));
      }
    });
  }

  remove(proposal: any): void {
    this.proposals = this.proposals.filter(p => p.id !== proposal.id);
    this.dataSource = new MatTableDataSource(this.proposals);
    this.dataSource.sort = this.sort;
  }
}
