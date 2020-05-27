import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Injectable()
export class AlreadyLoggedGuardService implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean  {
    if (this.authService.loggedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
