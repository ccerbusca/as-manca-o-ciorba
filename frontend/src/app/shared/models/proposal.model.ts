import {Review} from './review.model';
import {Bidding} from './bidding.model';
import {Submission} from './submission.model';
import {Status} from './status.enum';
import {User} from './user.model';

export class Proposal {
  name?: string;
  uploadTime?: Date;
  keywords?: string[];
  topics?: string[];
  reviews?: Review[];
  biddings?: Bidding[];
  submission?: Submission;
  conferenceID?: number;
  status?: Status;
  author?: User;
}
