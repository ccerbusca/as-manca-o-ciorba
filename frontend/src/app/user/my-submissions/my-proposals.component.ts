import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {ProposalService} from '../../shared/proposal.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {RecommendationDialogComponent} from './recommendation-dialog/recommendation-dialog.component';
import {Proposal} from '../../shared/models/proposal.model';
import {Status} from '../../shared/models/status.enum';
import {AuthService} from '../../shared/auth/auth.service';

@Component({
  selector: 'app-my-proposals',
  templateUrl: './my-proposals.component.html',
  styleUrls: ['./my-proposals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProposalsComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  proposals: Proposal[];
  dataSource: MatTableDataSource<Proposal>;
  displayedColumns: string[] = ['title', 'status', 'abstractPaperUrl', 'fullPaperUrl', 'recommendation'];

  Status = Status;

  constructor(private proposalService: ProposalService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.proposalService.getProposalByUsername(this.authService.currentUser)
      .subscribe(proposals => {
        this.proposals = proposals;
        this.dataSource = new MatTableDataSource(this.proposals);
        this.dataSource.sort = this.sort;
        console.log(this.proposals);
      });
  }

  openDialog(proposal: Proposal): void {
    this.dialog.open(RecommendationDialogComponent,
      {width: '500px', data: {text: proposal.reviews
                                              .filter(review => !!review.recommendation)
                                              .map(review => review.recommendation)}
      }).afterClosed().subscribe(_ => console.log('dialog closed'));
  }

  hasRecommendations(proposal: Proposal): boolean {
    return proposal.reviews.some(review => !!review.recommendation);
  }
}
