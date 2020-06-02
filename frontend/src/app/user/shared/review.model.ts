import {ReviewResult} from './reviewResult.enum';
import {PCMember} from './programCommiteeMember.model';

export class Review {
  recommendation: string;
  result: ReviewResult;
  pcMember: PCMember;
}
