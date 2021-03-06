import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {SignUpComponent} from './sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './user/user.component';
import {SignUpDialogComponent} from './sign-up/sign-up-dialog/sign-up-dialog.component';
import {MyProposalsComponent} from './user/my-submissions/my-proposals.component';
import {ProposalService} from './shared/proposal.service';
import {RecommendationDialogComponent} from './user/my-submissions/recommendation-dialog/recommendation-dialog.component';
import {LogInComponent} from './log-in/log-in.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './shared/config.service';
import {AuthService} from './shared/auth/auth.service';
import {AuthGuardService} from './shared/auth/guards/auth-guard.service';
import {AlreadyLoggedGuardService} from './shared/auth/guards/already-logged-guard.service';
import {ReviewComponent} from './user/review/review.component';
import {ReviewResultDialogComponent} from './user/review/review-result-dialog/review-result-dialog.component';
import {ReviewRecommendationDialogComponent} from './user/review/review-recommendation-dialog/review-recommendation-dialog.component';
import {MyConferencesComponent} from './user/my-conferences/my-conferences.component';
import {ConferenceService} from './shared/conference.service';
import {ConferenceDetailComponent} from './conference/conference-detail/conference-detail.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DatePipe} from '@angular/common';
import {PostponeDialogComponent} from './user/my-conferences/postpone-dialog/postpone-dialog.component';
import {AddProposalComponent} from './conference/conference-detail/add-proposal/add-proposal.component';
import {AddConferenceComponent} from './conference/add-conference/add-conference.component';
import {InterestedDialogComponent} from './conference/conference-detail/interested-dialog/interested-dialog.component';
import {BidResultDialogComponent} from './user/bid/bid-result-dialog/bid-result-dialog.component';
import {BidComponent} from './user/bid/bid.component';
import {AssignReviewersComponent} from './user/my-conferences/assign-reviewers/assign-reviewers.component';
// tslint:disable-next-line:max-line-length
import {AssignReviewersDialogComponent} from './user/my-conferences/assign-reviewers/assign-reviewers-dialog/assign-reviewers-dialog.component';

export function initConfig(config: ConfigService): () => Promise<void> {
  return () => config.loadConfiguration();
}

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignUpDialogComponent,
    LogInComponent,
    MyProposalsComponent,
    RecommendationDialogComponent,
    MyConferencesComponent,
    PostponeDialogComponent,
    ConferenceDetailComponent,
    HomePageComponent,
    ReviewComponent,
    ReviewResultDialogComponent,
    ReviewRecommendationDialogComponent,
    AddConferenceComponent,
    InterestedDialogComponent,
    BidResultDialogComponent,
    BidComponent,
    AssignReviewersComponent,
    AssignReviewersDialogComponent,
    AddProposalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ {provide: APP_INITIALIZER, useFactory: initConfig, deps: [ConfigService], multi: true},
    ConfigService, AuthService, AuthGuardService, AlreadyLoggedGuardService, ProposalService, ConferenceService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
