import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LogInComponent} from './log-in/log-in.component';
import {AppComponent} from './app.component';
import {AlreadyLoggedGuardService} from './shared/auth/guards/already-logged-guard.service';
import {MySubmissionsComponent} from './user/my-submissions/my-submissions.component';
import {AuthGuardService} from './shared/auth/guards/auth-guard.service';
import {MyConferencesComponent} from './user/my-conferences/my-conferences.component';
import {ConferenceDetailComponent} from './conference/conference-detail/conference-detail.component';


const routes: Routes = [
  {path: '', component: AppComponent, pathMatch: 'full'},
  {path: 'signup', component: SignUpComponent, canActivate: [AlreadyLoggedGuardService]},
  {path: 'login', component: LogInComponent, canActivate: [AlreadyLoggedGuardService]},
  {path: 'my-submissions', component: MySubmissionsComponent, canActivate: [AuthGuardService]},
  {path: 'my-conferences', component: MyConferencesComponent, canActivate: [AuthGuardService]},
  {path: 'conferences/:name', component: ConferenceDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
