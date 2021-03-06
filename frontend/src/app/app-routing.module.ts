import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LogInComponent} from './log-in/log-in.component';
import {AlreadyLoggedGuardService} from './shared/auth/guards/already-logged-guard.service';
import {MyProposalsComponent} from './user/my-submissions/my-proposals.component';
import {AuthGuardService} from './shared/auth/guards/auth-guard.service';
import {MyConferencesComponent} from './user/my-conferences/my-conferences.component';
import {ConferenceDetailComponent} from './conference/conference-detail/conference-detail.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ReviewComponent} from './user/review/review.component';
import {AssignReviewersComponent} from './user/my-conferences/assign-reviewers/assign-reviewers.component';
import {BidComponent} from './user/bid/bid.component';

const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'register', component: SignUpComponent, canActivate: [AlreadyLoggedGuardService]},
  {path: 'login', component: LogInComponent, canActivate: [AlreadyLoggedGuardService]},
  {path: 'my-proposals', component: MyProposalsComponent, canActivate: [AuthGuardService]},
  {path: 'my-conferences', component: MyConferencesComponent, canActivate: [AuthGuardService]},
  {path: 'conference/:id', component: ConferenceDetailComponent},
  {path: 'review/:id', component: ReviewComponent, canActivate: [AuthGuardService]},
  {path: 'assign-reviewers/:id', component: AssignReviewersComponent, canActivate: [AuthGuardService]},
  {path: 'bid/:id', component: BidComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
