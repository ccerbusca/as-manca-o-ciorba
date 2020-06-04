import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PCMember} from '../../shared/models/program-commitee-member.model';
import {User} from '../../shared/models/user.model';
import {Role} from '../../shared/models/role.enum';
import {ConferenceService} from '../../shared/conference.service';
import {UserService} from '../../shared/user.service';
import {Conference} from '../../shared/models/conference.model';
import {MatOptionSelectionChange} from '@angular/material/core';
import {AuthService} from '../../shared/auth/auth.service';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

export interface DialogData {
  user: User;
}
@Component({
  selector: 'app-add-conference',
  templateUrl: './add-conference.component.html',
  styleUrls: ['./add-conference.component.scss']
})
export class AddConferenceComponent implements OnInit {
  conferenceForm: FormGroup;
  users: User[];
  chair: PCMember;
  conference: Conference;
  Role = Role;

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  constructor(private conferenceService: ConferenceService,
              private userService: UserService,
              private authService: AuthService,
              private dialogRef: MatDialogRef<AddConferenceComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.conference = new Conference();
    this.userService.getUsers().subscribe(users => this.users = users.filter(u => u.username !== this.authService.currentUser));
    this.chair = new PCMember();
    this.chair.user = this.data.user;
    this.chair.role = Role.CHAIR;
    this.conference.pcMembers = [this.chair];
    this.initForm();
  }

  private initForm(): void {
    this.conferenceForm = this.formBuilder.group({
      title: ['', Validators.required],
      generalInfo: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      proposalDeadline: ['', Validators.required],
      assignmentDeadline: ['', Validators.required],
      evaluationDeadline: ['', Validators.required],
      resultsDeadline: ['', Validators.required],
    });
    this.conferenceForm.valueChanges.subscribe(values => {
      this.conference.title = values.title;
      this.conference.generalInfo = values.generalInfo;
      this.conference.startTime = values.startTime;
      this.conference.endTime = values.endTime;
      this.conference.proposalDeadline = values.proposalDeadline;
      this.conference.assignmentDeadline = values.assignmentDeadline;
      this.conference.evaluationDeadline = values.evaluationDeadline;
      this.conference.resultsDeadline = values.resultsDeadline;
    });
  }

  getName(ids: string): string {
    const id = +ids;
    return this.users.find(u => u.id === id).name;
  }

  addConference(): void {
    this.dialogRef.close(this.conference);
  }

  userSelected(event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      const username = event.source.value;
      const selected = this.users.find(u => u.username === username);
      this.users = this.users.filter(u => u.username !== username);
      const pcMember = new PCMember();
      pcMember.user = selected;
      pcMember.role = Role.MEMBER;
      this.conference.pcMembers.push(pcMember);
      this.autocomplete.closePanel();
    }
  }
}
