import {Component, Input, OnInit} from '@angular/core';
import {Conference} from '../../shared/models/conference.model';
import {ConferenceService} from '../../shared/conference.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {InterestedDialogComponent} from './interested-dialog/interested-dialog.component';
import {AuthService} from '../../shared/auth/auth.service';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-conference-detail',
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.scss']
})
export class ConferenceDetailComponent implements OnInit {

  @Input() conference: Conference;

  constructor(private conferenceService: ConferenceService,
              private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getConference();
  }

  apply(): void {
    return;
  }

  get possibleToSubmit(): boolean {
    return this.conference.proposalDeadline < new Date();
  }
  get possibleToAttend(): boolean {
    return this.conference.startTime < new Date();
  }

  interested(): void {
    this.userService.getPCMemberByUsername(this.authService.currentUser)
      .subscribe(user => {
        this.conference.interested.push(user);
        this.conferenceService.updateConference(this.conference).subscribe();
        console.log(this.conference);
        this.dialog.open(InterestedDialogComponent,
          {width: '300px'})
          .afterClosed().subscribe();
      });
  }

  private getConference(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.conferenceService.getConference(id).subscribe(conference => this.conference = conference);
  }

  canBeInterested(): boolean {
    let result = true;
    this.conference.interested.forEach(user => {
      if (user.username === this.authService.currentUser) {
        result = false;
      }
    });
    return result;
  }
}
