import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Conference} from '../../shared/conference.model';
import {ConferenceService} from '../../shared/conference.service';

export interface DialogData {
  conference: Conference;
}


@Component({
  selector: 'app-postpone-dialog',
  templateUrl: './postpone-dialog.component.html',
  styleUrls: ['./postpone-dialog.component.scss']
})
export class PostponeDialogComponent implements OnInit {
  phase = 'IMPLEMENT BACKEND DUDE';
  conference: Conference;

  constructor(private dialogRef: MatDialogRef<PostponeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private conferenceService: ConferenceService) {
  }

  ngOnInit(): void {
    const currentDate: Date = new Date();
    this.conference = this.data.conference;
    if (this.conference.proposalDeadline.getDate() > currentDate.getDate()) {
      this.phase = 'proposal';
    } else {
      if (this.conference.evaluationDeadline.getDate() > currentDate.getDate()) {
        this.phase = 'evaluation';
      } else {
        if (this.conference.assignmentDeadline.getDate() > currentDate.getDate()) {
          this.phase = 'assignment';
        } else {
          this.phase = 'results';
        }
      }
    }
  }

  updateConference(days: string): void {
    const addition: number = +days;
    switch (this.phase) {
      case 'proposal':
        this.conference.proposalDeadline.setDate(this.conference.proposalDeadline.getDate() + addition);
        break;
      case 'evaluation':
        this.conference.evaluationDeadline.setDate(this.conference.evaluationDeadline.getDate() + addition);
        break;
      case 'assignment':
        this.conference.assignmentDeadline.setDate(this.conference.assignmentDeadline.getDate() + addition);
        break;
      case 'results':
        this.conference.resultsDeadline.setDate(this.conference.resultsDeadline.getDate() + addition);
        break;
    }

    this.conferenceService.updateConference(this.conference);
    this.dialogRef.close();
  }
}
