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
import {LogInComponent} from './log-in/log-in.component';
import {ConfigLoadingService} from './shared/config-loading-service';
import {AuthService} from './shared/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './shared/auth/guards/auth-guard.service';
import {AlreadyLoggedGuardService} from './shared/auth/guards/already-logged-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignUpDialogComponent,
    LogInComponent
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
  providers: [ConfigLoadingService, AuthService, AuthGuardService, AlreadyLoggedGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
