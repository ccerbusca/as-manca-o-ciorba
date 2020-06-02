import {Submission} from './submission.model';
import {Review} from './review.model';

export class Proposal {
  id: number;
  name: string;
  uploadTime: Date;
  keywords: string[];
  topics: string[];
  submission: Submission;
  reviews: Review[];
  recommendations: string[];
}
