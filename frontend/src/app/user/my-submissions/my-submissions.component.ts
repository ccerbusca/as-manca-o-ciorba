import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Submission} from "../shared/submission.model";
import {SubmissionService} from "../shared/submission.service";
import {MatSort, MatSortable} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {RecommendationDialogComponent} from "./recommendation-dialog/recommendation-dialog.component";

@Component({
  selector: 'app-my-submissions',
  templateUrl: './my-submissions.component.html',
  styleUrls: ['./my-submissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySubmissionsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  submissions: Submission[];
  dataSource;
  displayedColumns = ['title', 'status', 'abstractPaperUrl', 'fullPaperUrl', 'recommendation'];

  constructor(private submissionService: SubmissionService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.submissionService.getSubmissions()
      .subscribe(submissions => {
        this.submissions = submissions
        this.dataSource = new MatTableDataSource(this.submissions);
        this.dataSource.sort = this.sort;
        console.log(this.submissions)
      })
  }

  openDialog(submission: Submission) {
    this.submissionService.getRecommendation(submission)
      .subscribe(result =>
        this.dialog.open(RecommendationDialogComponent,
          {width: '250px', data: {text: result.text}})
          .afterClosed().subscribe(_ =>
          console.log('dialog closed')))

  }
}
