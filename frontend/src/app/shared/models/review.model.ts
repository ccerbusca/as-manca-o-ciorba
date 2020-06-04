import {ReviewResult} from './review-result.enum';

export class Review {
  recommendation?: string;
  result?: ReviewResult;
  username: string;
}
