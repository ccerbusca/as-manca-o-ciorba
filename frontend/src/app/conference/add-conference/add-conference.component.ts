import {Component, Inject, OnInit} from '@angular/core';
import {ConferenceService} from '../../user/shared/conference.service';
import {UserService} from "../../user/shared/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Conference} from '../../user/shared/conference.model';
import {PCMember} from '../../user/shared/programCommiteeMember.model';
import {User} from "../../user/shared/user.model";

export interface DialogData {
  user: PCMember;
}
@Component({
  selector: 'app-add-conference',
  templateUrl: './add-conference.component.html',
  styleUrls: ['./add-conference.component.scss']
})
export class AddConferenceComponent implements OnInit {
  users: User[] = [];
  pcMembers: PCMember[] = [];
  chair: PCMember;
  constructor(private conferenceService: ConferenceService,
              private userService: UserService,
              private dialogRef: MatDialogRef<AddConferenceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.chair = this.data.user;
  }
  addConference(Title: string, Password: string, generalInfo: string, StartDatePicker: Date, EndDatePicker: Date, proposalDeadlinePicker: Date, assignmentDeadlinePicker: Date, evaluationDeadlinePicker: Date, resultsDeadlinePicker: Date,): void {
    this.conferenceService.addConference(Title, Password, generalInfo, StartDatePicker, EndDatePicker, proposalDeadlinePicker, assignmentDeadlinePicker, evaluationDeadlinePicker, resultsDeadlinePicker,  );
    this.dialogRef.close();
  }
}
