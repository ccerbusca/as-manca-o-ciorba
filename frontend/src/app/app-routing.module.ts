import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LogInComponent} from './log-in/log-in.component';
import {AppComponent} from './app.component';
import {AlreadyLoggedGuardService} from './shared/auth/guards/already-logged-guard.service';


const routes: Routes = [
  {path: '', component: AppComponent, pathMatch: 'full'},
  {path: 'signup', component: SignUpComponent, canActivate: [AlreadyLoggedGuardService]},
  {path: 'login', component: LogInComponent, canActivate: [AlreadyLoggedGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
