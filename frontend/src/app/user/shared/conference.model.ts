import {PCMember} from './programCommiteeMember.model';

export class Conference {
  id: number;
  title: string;
  password: string;
  generalInfo: string;
  startTime: Date;
  endTime: Date;
  proposalDeadline: Date;
  assignmentDeadline: Date;
  evaluationDeadline: Date;
  resultsDeadline: Date;
  pcMembers: PCMember[];
}
