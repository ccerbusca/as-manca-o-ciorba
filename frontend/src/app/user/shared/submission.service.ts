import {Injectable} from "@angular/core";
import {Submission} from "./submission.model";
import {Recommendation} from "./recommendation.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {

  constructor() {
  }

  getSubmissions(): Observable<Submission[]> {
    let submissions: Submission[] = []
    for (var i = 0; i < 10; i++) {
      submissions.push({
        title: "title",
        fullPaperUrl: "full paper URL",
        abstractPaperUrl: "abstract paper URL",
        status: "awaiting review"
      })
    }
    return of(submissions);
  }

  getRecommendation(submission: Submission): Observable<Recommendation> {
    var recommendation: Recommendation;
    recommendation.text = 'NICE'
    return of(recommendation)
  }
}
