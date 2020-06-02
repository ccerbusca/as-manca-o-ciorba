import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../my-submissions/recommendation-dialog/recommendation-dialog.component';

@Component({
  selector: 'app-review-recommendation-dialog',
  templateUrl: './review-recommendation-dialog.component.html',
  styleUrls: ['./review-recommendation-dialog.component.scss']
})
export class ReviewRecommendationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ReviewRecommendationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  recommend(recommendation: string): void {
    this.dialogRef.close(recommendation);
    alert('Recommendation sent:' + recommendation);
  }
}
