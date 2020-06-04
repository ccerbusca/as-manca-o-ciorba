import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-interested-dialog',
  templateUrl: './interested-dialog.component.html',
  styleUrls: ['./interested-dialog.component.scss']
})
export class InterestedDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InterestedDialogComponent>) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
