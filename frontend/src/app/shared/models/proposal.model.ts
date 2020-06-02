import {Submission} from './submission.model';
import {Review} from './review.model';
import {Bidding} from './bidding.model';
import {Status} from './status.enum';
import {User} from './user.model';

export class Proposal {
  id: number;
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
