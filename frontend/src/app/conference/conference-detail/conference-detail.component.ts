import { Component, OnInit } from '@angular/core';
import {Conference} from '../shared/conference.model';
import {PcMember} from "../../user/pc-member/shared/pcMember.model";
import {MEMBERS} from "../../user/pc-member/shared/mock-members";

@Component({
  selector: 'app-conference-detail',
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.scss']
})
export class ConferenceDetailComponent implements OnInit {

  conference: Conference = {
    id: 1,
    name: 'Basketball',
    password: 'abcd',
    startTime: new Date(2020, 8 , 10),
    endTime: new Date(2020, 8, 11),
    proposalDeadline: new Date(2020, 6, 21),
    assignmentDeadline: new Date(2020, 6, 27),
    evaluationDeadline: new Date(2020, 7, 3),
    resultsDeadline: new Date(2020, 7, 10),
    generalInfo: 'ashfhabsjncjasdnj jjasdokfjkoa qwer \n adfjasdfiasgf',
    pcMembers: MEMBERS
  };
  constructor() { }

  ngOnInit(): void {
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
}
