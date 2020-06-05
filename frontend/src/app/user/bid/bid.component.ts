import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {Proposal} from '../../shared/models/proposal.model';
import {MatTableDataSource} from '@angular/material/table';
import {ProposalService} from '../../shared/proposal.service';
import {AuthService} from '../../shared/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {BidResultDialogComponent} from './bid-result-dialog/bid-result-dialog.component';
import {BidResult} from '../../shared/models/bid-result.enum';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {

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

  openBidDialog(proposal: Proposal): void {
    this.dialog.open(BidResultDialogComponent,
      {width: '1000px'})
      .afterClosed().subscribe((result: BidResult) => {
        if (!!result) {
          this.proposalService.bid(proposal, result).subscribe(bidProposal => {
            this.proposals.map(p => p.id === bidProposal.id ? bidProposal : p);
            this.proposals = this.proposals.filter(p => p.id !== proposal.id);
            this.dataSource = new MatTableDataSource(this.proposals);
            this.dataSource.sort = this.sort;
          });
        }
    });
  }

}
