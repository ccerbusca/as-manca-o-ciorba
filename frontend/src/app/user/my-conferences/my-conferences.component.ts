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
import {UserService} from '../../shared/user.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-conferences',
  templateUrl: './my-conferences.component.html',
  styleUrls: ['./my-conferences.component.scss']
})
export class MyConferencesComponent implements OnInit {
  conferences: Conference[];
  user: User;
  Role = Role;

  constructor(private conferenceService: ConferenceService,
              private authService: AuthService,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.update();
  }

  private update(): void {
    this.conferenceService.getConferencesForUser(this.authService.currentUser)
      .subscribe(conferences => {
        console.log(conferences);
        this.conferences = conferences;
        this.userService.getPCMemberByUsername(this.authService.currentUser).subscribe(
          user => this.user = user,
          _ => console.log('not found'));
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
    this.dialog.open(AddConferenceComponent, {width: '440px', data: {user: this.user}}).afterClosed().subscribe(
      conference => {
        if (!!conference) {
          this.conferenceService.createConference(conference).subscribe(_ => this.update());
        }
      });
  }

  checkBidPhase(conference: Conference): boolean {
    return conference.proposalDeadline > new Date();
  }

  checkEvaluatePhase(conference: Conference): boolean {
    return conference.assignmentDeadline < new Date() && conference.evaluationDeadline > new Date();
  }

  checkAssigningPhase(conference: Conference): boolean {
    return conference.proposalDeadline < new Date() && conference.assignmentDeadline > new Date();
  }

  reviewToBeDone(conference: Conference): boolean {
    return this.checkEvaluatePhase(conference) &&
      conference.proposals.some(proposal => !proposal.reviews.some(review => review.username === this.authService.currentUser));
  }

  biddingToBeDone(conference: Conference): boolean {
    return this.checkBidPhase(conference) &&
      conference.proposals.some(proposal => !proposal.biddings.some(bidding => bidding.username === this.authService.currentUser)) &&
      conference.pcMembers.find(pcm => pcm.user.username === this.authService.currentUser).role !== Role.CHAIR;
  }

  getCurrentPCMember(conference: Conference): PCMember {
    return conference.pcMembers.find(pcm => pcm.user.username === this.user.username);
  }

  goToAssignReviewers(id): void {
    this.router.navigate([`assign-reviewers/${id}`]);
  }

  bid(conference: Conference): void {
    this.router.navigate([`bid/${conference.id}`]);
  }

  review(conference: Conference): void {
    this.router.navigate([`review/${conference.id}`]);
  }

  contradictoryReviews(conference: Conference): boolean {
    let f = 0;
    conference.proposals.some(proposal => {
      proposal.reviews.forEach(review => {
        if ( +review.result.valueOf() > 0) {
          if (proposal.reviews.some(bid2 => +bid2.result.valueOf() < 0)) {
            f += 1;
          }
        }
        if ( +review.result.valueOf() < 0) {
          if (proposal.reviews.some(bid2 => +bid2.result.valueOf() > 0)) {
            f += 1;
          }
        }
      });
    });
    return f !== 0;
  }
}
