import {ReviewResult} from './reviewResult.enum';
import {Proposal} from './proposal.model';
import {PCMember} from './programCommiteeMember.model';

export class Review {
  recommendation: string;
  result: ReviewResult;
  proposal: Proposal;
  pcMember: PCMember;
}
