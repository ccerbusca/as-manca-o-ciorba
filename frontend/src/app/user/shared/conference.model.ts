import {PCMember} from './programCommiteeMember.model';

export class Conference {
  title: string;
  startTime: Date;
  endTime: Date;
  proposalDeadline: Date;
  assignmentDeadline: Date;
  evaluationDeadline: Date;
  resultsDeadline: Date;
  pcMembers: PCMember[];
}
