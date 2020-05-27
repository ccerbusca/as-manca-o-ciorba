import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {SignUpComponent} from './sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './user/user.component';
import {UserService} from './user/shared/user.service';
import {SignUpDialogComponent} from './sign-up/sign-up-dialog/sign-up-dialog.component';
import {MySubmissionsComponent} from './user/my-submissions/my-submissions.component';
import {SubmissionService} from "./user/shared/submission.service";
import {RecommendationDialogComponent} from './recommendation-dialog/recommendation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignUpDialogComponent,
    MySubmissionsComponent,
    RecommendationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, SubmissionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
