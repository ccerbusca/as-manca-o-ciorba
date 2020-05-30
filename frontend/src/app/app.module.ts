import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {SignUpComponent} from './sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './user/user.component';
import {SignUpDialogComponent} from './sign-up/sign-up-dialog/sign-up-dialog.component';
import {MySubmissionsComponent} from './user/my-submissions/my-submissions.component';
import {SubmissionService} from './user/shared/submission.service';
import {RecommendationDialogComponent} from './user/my-submissions/recommendation-dialog/recommendation-dialog.component';
import {LogInComponent} from './log-in/log-in.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfigLoadingService} from './shared/config-loading-service';
import {AuthService} from './shared/auth/auth.service';
import {AuthGuardService} from './shared/auth/guards/auth-guard.service';
import {AlreadyLoggedGuardService} from './shared/auth/guards/already-logged-guard.service';
import {MyConferencesComponent} from './user/my-conferences/my-conferences.component';
import {ConferenceService} from './user/shared/conference.service';
import {PostponeDialogComponent} from "./user/my-conferences/postpone-dialog/postpone-dialog.component";
import {ConferenceDetailComponent} from "./conference/conference-detail/conference-detail.component";


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
    ConferenceDetailComponent
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
  providers: [ConfigLoadingService, AuthService, AuthGuardService, AlreadyLoggedGuardService, SubmissionService, ConferenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
