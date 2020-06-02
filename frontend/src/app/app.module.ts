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
import {MySubmissionsComponent} from './user/my-submissions/my-submissions.component';
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
import {PostponeDialogComponent} from './user/my-conferences/postpone-dialog/postpone-dialog.component';
import {ConferenceDetailComponent} from './conference/conference-detail/conference-detail.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DatePipe} from '@angular/common';

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
    MySubmissionsComponent,
    RecommendationDialogComponent,
    MyConferencesComponent,
    PostponeDialogComponent,
    ConferenceDetailComponent,
    HomePageComponent,
    ReviewComponent,
    ReviewResultDialogComponent,
    ReviewRecommendationDialogComponent
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
