import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss']
})
export class SignUpDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SignUpDialogComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
