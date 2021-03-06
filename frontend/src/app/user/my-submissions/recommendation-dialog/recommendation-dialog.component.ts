import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  text: string[];
}

@Component({
  selector: 'app-recommendation-dialog',
  templateUrl: './recommendation-dialog.component.html',
  styleUrls: ['./recommendation-dialog.component.scss']
})
export class RecommendationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RecommendationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

  get formattedText(): string {
    return this.data.text.reduce((acc, t) => acc + '\n' + t);
  }

  close(): void {
    this.dialogRef.close();
  }
}
