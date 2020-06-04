import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Bidding} from '../../../../shared/models/bidding.model';
import {Review} from '../../../../shared/models/review.model';

export class DialogData {
  proposalBiddings: Bidding[];
}

@Component({
  selector: 'app-assign-reviewers-dialog',
  templateUrl: './assign-reviewers-dialog.component.html',
  styleUrls: ['./assign-reviewers-dialog.component.scss']
})
export class AssignReviewersDialogComponent implements OnInit {

  selectedBidders: Bidding[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<AssignReviewersDialogComponent>,
              ) { }

  ngOnInit(): void {
  }
  get canSubmit(): boolean {
    return !(this.selectedBidders.length >= 2 && this.selectedBidders.length <= 4);
  }

  assign(): void {
    const reviews: Review[] = [];
    this.selectedBidders.forEach(bid => {
      const r: Review = {
        username: bid.username
      };
      reviews.push(r);
    });
    this.dialogRef.close(reviews);
  }
}
