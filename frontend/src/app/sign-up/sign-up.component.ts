import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {UserService} from '../user/shared/user.service';

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

  emailFormControl = new FormControl('',[
    Validators.required, Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }


  signUp(username: string, email: string, password: string, affiliation: string) {
    this.userService.save({username, email, password, affiliation}).subscribe(user => console.log('saved user', user));
  }

  goToLogin(): void {
    this.router.navigate(['logIn']);
  }


}
