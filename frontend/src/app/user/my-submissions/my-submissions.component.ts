import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Submission} from '../shared/submission.model';
import {SubmissionService} from '../shared/submission.service';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {RecommendationDialogComponent} from './recommendation-dialog/recommendation-dialog.component';

@Component({
  selector: 'app-my-submissions',
  templateUrl: './my-submissions.component.html',
  styleUrls: ['./my-submissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySubmissionsComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  submissions: Submission[];
  dataSource: MatTableDataSource<Submission>;
  displayedColumns: string[] = ['title', 'status', 'abstractPaperUrl', 'fullPaperUrl', 'recommendation'];

  constructor(private submissionService: SubmissionService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.submissionService.getSubmissions()
      .subscribe(submissions => {
        this.submissions = submissions;
        this.dataSource = new MatTableDataSource(this.submissions);
        this.dataSource.sort = this.sort;
        console.log(this.submissions);
      });
  }

  openDialog(submission: Submission): void {
    this.dialog.open(RecommendationDialogComponent,
      {width: '500px', data: {text: submission.recommendation}})
      .afterClosed().subscribe(_ =>
      console.log('dialog closed'));
  }
}
