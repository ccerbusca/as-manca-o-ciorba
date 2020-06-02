import {PCMember} from './program-commitee-member.model';
import {Proposal} from './proposal.model';

export class Conference {
  id: number;
  title: string;
  generalInfo: string;
  startTime: Date;
  endTime: Date;
  proposalDeadline: Date;
  assignmentDeadline: Date;
  evaluationDeadline: Date;
  resultsDeadline: Date;
  pcMembers: PCMember[];
  proposals: Proposal[];
}
