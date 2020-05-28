import {Component, OnInit} from '@angular/core';
import {Conference} from '../shared/conference.model';
import {ConferenceService} from '../shared/conference.service';
import {PCMember} from '../shared/programCommiteeMember.model';
import {Role} from '../shared/role.enum';

export class ExpansionOverviewExample {
  panelOpenState = false;
}

@Component({
  selector: 'app-my-conferences',
  templateUrl: './my-conferences.component.html',
  styleUrls: ['./my-conferences.component.scss']
})
export class MyConferencesComponent implements OnInit {
  conferences: Conference[];
  user: PCMember;
  Role = Role;

  constructor(private conferenceService: ConferenceService) {
  }

  ngOnInit(): void {
    this.conferenceService.getConferences()
      .subscribe(conferences => {
        console.log(conferences);
        this.conferences = conferences;
        // mockup purposes following:
        const choice = this.getRandom();
        switch (choice % 3) {
          case 0:
            this.user = this.conferences[0].pcMembers[0]; // chair
            break;
          case 1:
            this.user = this.conferences[0].pcMembers[1]; // cochair
            break;
          case 2:
            this.user = this.conferences[0].pcMembers[8]; // member
            break;
        }
      });
  }

  getRandom(): number {
    // this is here just for mockup reasons
    return Math.floor(Math.random() * 6) + 1;
  }
}
