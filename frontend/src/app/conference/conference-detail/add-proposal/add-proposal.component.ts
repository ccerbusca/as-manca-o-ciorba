import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Proposal} from '../../../shared/models/proposal.model';

@Component({
  selector: 'app-add-proposal',
  templateUrl: './add-proposal.component.html',
  styleUrls: ['./add-proposal.component.scss']
})
export class AddProposalComponent implements OnInit {

  proposalForm: FormGroup;
  private proposal: Proposal;

  constructor(private dialogRef: MatDialogRef<AddProposalComponent>,
              private formBuilder: FormBuilder) {
    this.proposal = new Proposal();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.proposalForm = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      topics: ['', Validators.required]
    });
    this.proposalForm.valueChanges.subscribe(values => {
      this.proposal.name = values.name;
      this.proposal.keywords = values.keywords.split(',').map(s => s.trim());
      this.proposal.topics = values.topics.split(',').map(s => s.trim());
    });
  }

  submit(): void {
    this.proposal.uploadTime = new Date();
    this.dialogRef.close(this.proposal);
  }
}
