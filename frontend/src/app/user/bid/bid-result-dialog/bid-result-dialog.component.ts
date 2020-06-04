import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../my-submissions/recommendation-dialog/recommendation-dialog.component';
import {BidResult} from '../../../shared/models/bid-result.enum';

@Component({
  selector: 'app-bid-result-dialog',
  templateUrl: './bid-result-dialog.component.html',
  styleUrls: ['./bid-result-dialog.component.scss']
})
export class BidResultDialogComponent implements OnInit {

  results = BidResult;

  constructor(private dialogRef: MatDialogRef<BidResultDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  values(): any {
    return Object.values(this.results).filter(
      (type) => isNaN(type as any)
    );
  }

  bid(result): void {
    this.dialogRef.close(result);
    alert('Bid sent:' + result);
  }
}
