import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from './sign-up-dialog/confirmation-dialog.component';
import {AuthService} from '../shared/auth/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User;

  signUpForm: FormGroup;
  matcher = new MyErrorStateMatcher();


  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.initForm();
  }


  signUp(): void {
    this.authService.register(this.user).subscribe(user => {
      this.dialog.open(ConfirmationDialogComponent, {
        width: '400px', data: {header: 'Successfully signed up!',
          content: 'You need to do one more step before logging in. Check your e-mail and verify your account'}
      }).afterClosed().subscribe(() => this.goToLogin());
    });
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }


  private initForm(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      affiliation: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
    this.signUpForm.valueChanges.subscribe(values => {
      this.user.name = values.name;
      this.user.username = values.username;
      this.user.email = values.email;
      this.user.password = values.password;
      this.user.affiliation = values.affiliation;
    });
  }
}
