import {Component} from '@angular/core';
import {AuthService} from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(private authService: AuthService) {
  }

  get isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
