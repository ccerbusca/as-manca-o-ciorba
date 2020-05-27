import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user/shared/user.model';
import {AuthService} from '../shared/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  errorMessage = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm.valueChanges.subscribe(values => {
      this.user.username = values.username;
      this.user.password = values.password;
    });
  }

  login(): void {
    this.authService.login(this.user)
      .subscribe(() => this.successLogin(),
        () => this.errorMessage = true);
  }

  registerRedirect(): void {
    this.router.navigate(['register']);
  }

  private successLogin(): void {
    this.router.navigate(['']);
  }
}
