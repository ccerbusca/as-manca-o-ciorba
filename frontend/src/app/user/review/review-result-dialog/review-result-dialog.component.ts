import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../my-submissions/recommendation-dialog/recommendation-dialog.component';
import {ReviewResult} from '../../shared/reviewResult.enum';

@Component({
  selector: 'app-review-result-dialog',
  templateUrl: './review-result-dialog.component.html',
  styleUrls: ['./review-result-dialog.component.scss']
})
export class ReviewResultDialogComponent implements OnInit {

  results = ReviewResult;

  constructor(private dialogRef: MatDialogRef<ReviewResultDialogComponent>,
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

  review(result): void {
    this.dialogRef.close(result);
    alert('Review sent:' + result);
  }
}
