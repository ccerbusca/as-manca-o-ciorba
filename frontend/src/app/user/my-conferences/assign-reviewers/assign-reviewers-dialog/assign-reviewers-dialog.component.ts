import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Bidding} from '../../../../shared/models/bidding.model';
import {ConferenceService} from "../../../../shared/conference.service";
import {ActivatedRoute} from "@angular/router";
import {Review} from "../../../../shared/models/review.model";

export class DialogData {
  biddings: Bidding[];
}

@Component({
  selector: 'app-assign-reviewers-dialog',
  templateUrl: './assign-reviewers-dialog.component.html',
  styleUrls: ['./assign-reviewers-dialog.component.scss']
})
export class AssignReviewersDialogComponent implements OnInit {

  selectedBidders: Bidding[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private conferenceService: ConferenceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  get canSubmit(): boolean {
    return !(this.selectedBidders.length >= 2 && this.selectedBidders.length <= 4);
  }

  assign(): void {
    const confId = +this.route.snapshot.paramMap.get('id');
    this.selectedBidders.forEach(bid => {
      const r: Review = {
        username: bid.username
      };
      this.conferenceService.addReviewToConference(confId, r);
    });
  }
}
