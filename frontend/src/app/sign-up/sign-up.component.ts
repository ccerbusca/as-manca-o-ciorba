import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {UserService} from '../user/shared/user.service';
import {User} from '../user/shared/user.model';
import {MatDialog} from '@angular/material/dialog';
import {SignUpDialogComponent} from './sign-up-dialog/sign-up-dialog.component';

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
              private userService: UserService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {  }

  ngOnInit(): void {
    this.initForm();
  }


  signUp() {
    this.userService.save(this.user).subscribe(user => {
      console.log('saved user', user);
      this.dialog.open(SignUpDialogComponent, {
        width: '400px'
      }).afterClosed().subscribe(() => this.goToLogin());
    });
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }


  private initForm() {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      affiliation: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
    this.signUpForm.valueChanges.subscribe(values => {
      this.user.username = values.username;
      this.user.email = values.email;
      this.user.password = values.password;
      this.user.affiliation = values.affiliation;
    });
  }
}
