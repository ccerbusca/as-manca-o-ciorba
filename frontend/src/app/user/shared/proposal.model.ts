import {Submission} from './submission.model';

export class Proposal {
  name: string;
  uploadTime: Date;
  keywords: string[];
  topics: string[];
  submission: Submission;
}
