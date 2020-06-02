import {Component, OnInit} from '@angular/core';
import {Conference} from '../../shared/models/conference.model';
import {ConferenceService} from '../../shared/conference.service';
import {PCMember} from '../../shared/models/program-commitee-member.model';
import {Role} from '../../shared/models/role.enum';
import {MatDialog} from '@angular/material/dialog';
import {PostponeDialogComponent} from './postpone-dialog/postpone-dialog.component';
import {AuthService} from '../../shared/auth/auth.service';
import {DatePipe} from '@angular/common';
import {AddConferenceComponent} from '../../conference/add-conference/add-conference.component';

@Component({
  selector: 'app-my-conferences',
  templateUrl: './my-conferences.component.html',
  styleUrls: ['./my-conferences.component.scss']
})
export class MyConferencesComponent implements OnInit {
  conferences: Conference[];
  user: PCMember;
  Role = Role;

  constructor(private conferenceService: ConferenceService,
              private authService: AuthService,
              private dialog: MatDialog,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.update();
  }

  private update(): void {
    this.conferenceService.getConferencesForUser(this.authService.currentUser)
      .subscribe(conferences => {
        console.log(conferences);
        this.conferences = conferences;
        this.user = this.conferences[0].pcMembers[0];
      });
  }

  getCurrentDeadline(conference: Conference): string {
    const currentDate: Date = new Date();
    if (conference.proposalDeadline.getDate() > currentDate.getDate()) {
      return `Current deadline for proposals: ${this.datePipe.transform(conference.proposalDeadline)}`;
    } else {
      if (conference.assignmentDeadline.getDate() > currentDate.getDate()) {
        return `Current deadline for assigning reviewers: ${this.datePipe.transform(conference.assignmentDeadline)}`;
      } else {
        if (conference.evaluationDeadline.getDate() > currentDate.getDate()) {
          return `Current deadline for evaluating papers: ${this.datePipe.transform(conference.evaluationDeadline)}`;
        } else {
          return `Current deadline for presenting the results: ${this.datePipe.transform(conference.resultsDeadline)}`;
        }
      }
    }
  }

  openPostponeDialog(conference: Conference): void {
    this.dialog.open(PostponeDialogComponent,
      {width: '275px', data: {conference}})
      .afterClosed().subscribe(conf => {
        if (!!conf) {
          this.conferenceService.updateConference(conf).subscribe(_ => this.update());
        }
      });
  }

  openAddDialog(): void {
    this.dialog.open(AddConferenceComponent,
      {width: '440px', data: {user: this.user}})
      .afterClosed().subscribe(_ =>
      console.log('dialog closed'));
  }

  reviewToBeDone(conference: Conference): boolean {
    return conference.proposals.some(proposal => !proposal.reviews.every(review => review.username === this.authService.currentUser));
  }

  biddingToBeDone(conference: Conference): boolean {
    return conference.proposals.some(proposal => !proposal.biddings.every(bidding => bidding.username === this.authService.currentUser));
  }

  ifBiddingDone(conference: Conference): boolean {
    return conference.proposalDeadline.getTime() <= new Date().getTime();
  }
}
