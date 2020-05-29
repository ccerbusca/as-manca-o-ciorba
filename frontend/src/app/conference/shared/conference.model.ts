import {PcMember} from '../../user/pc-member/shared/pcMember.model';

export class Conference {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  proposalDeadline: Date;
  assignmentDeadline: Date;
  evaluationDeadline: Date;
  resultsDeadline: Date;
  password: string;
  generalInfo: string;
  pcMembers: PcMember[];
}
