import {Component, OnInit} from '@angular/core';
import {Conference} from '../../shared/models/conference.model';
import {ConferenceService} from '../../shared/conference.service';
import {PCMember} from '../../shared/models/program-commitee-member.model';
import {Role} from '../../shared/models/role.enum';
import {MatDialog} from '@angular/material/dialog';
import {PostponeDialogComponent} from './postpone-dialog/postpone-dialog.component';
import {AuthService} from '../../shared/auth/auth.service';

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
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.conferenceService.getConferencesForUser(this.authService.currentUser)
      .subscribe(conferences => {
        console.log(conferences);
        this.conferences = conferences;
        this.user = this.conferences[0].pcMembers[0];
      });
  }

  openDialog(conference: Conference): void {
    this.dialog.open(PostponeDialogComponent,
      {width: '440px', data: {conference}})
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
    return conference.assignmentDeadline.getTime() >= new Date().getTime();
  }
}
