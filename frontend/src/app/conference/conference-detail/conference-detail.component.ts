import {Component, OnInit} from '@angular/core';
import {Conference} from '../../shared/models/conference.model';
import {ConferenceService} from '../../shared/conference.service';
import {ActivatedRoute} from '@angular/router';
import {AddProposalComponent} from './add-proposal/add-proposal.component';
import {User} from '../../shared/models/user.model';
import {AuthService} from '../../shared/auth/auth.service';
import {Proposal} from '../../shared/models/proposal.model';
import {MatDialog} from '@angular/material/dialog';
import {InterestedDialogComponent} from './interested-dialog/interested-dialog.component';
import {UserService} from '../../shared/user.service';
import {ProposalService} from '../../shared/proposal.service';

@Component({
  selector: 'app-conference-detail',
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.scss']
})
export class ConferenceDetailComponent implements OnInit {

  conference: Conference;
  user: User;
  constructor(private conferenceService: ConferenceService,
              private proposalService: ProposalService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getConference();
  }

  apply(): void {
    this.dialog.open(AddProposalComponent, {width: '400px'}).afterClosed().subscribe((result: Proposal) => {
      if (!!result) {
        result.author = this.user;
        result.conferenceID = this.conference.id;
        this.conference.proposals.push(result);
        this.proposalService.addProposal(result, this.conference.id)
          .subscribe(proposal => this.conference.proposals.push(proposal));
      }
    });
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
        this.dialog.open(InterestedDialogComponent,
          {width: '300px'})
          .afterClosed().subscribe();
      });
  }

  private getConference(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.conferenceService.getConference(id).subscribe(conference => this.conference = conference);
    this.userService.getPCMemberByUsername(this.authService.currentUser).subscribe(
      user => this.user = user,
      _ => console.log('not found'));
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
