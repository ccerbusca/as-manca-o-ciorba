import {Component, Input, OnInit} from '@angular/core';
import {Conference} from '../../shared/models/conference.model';
import {ConferenceService} from '../../shared/conference.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-conference-detail',
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.scss']
})
export class ConferenceDetailComponent implements OnInit {

  @Input() conference: Conference;
  constructor(private conferenceService: ConferenceService, private route: ActivatedRoute) { }

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
    return;
  }

  private getConference(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.conferenceService.getConference(id).subscribe(conference => this.conference = conference);
  }
}
