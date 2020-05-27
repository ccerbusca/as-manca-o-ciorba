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
        title: "title" + i,
        fullPaperUrl: "full paper URL",
        abstractPaperUrl: "abstract paper URL",
        status: "awaiting review"
      })
    }
    submissions.push({
      title: "test",
      fullPaperUrl: "testL",
      abstractPaperUrl: "test",
      status: "accepted"
    })
    return of(submissions);
  }

  getRecommendation(submission: Submission): Observable<Recommendation> {
    var recommendation: Recommendation;
    recommendation = new Recommendation();
    recommendation.text = 'NICE'
    return of(recommendation)
  }
}
