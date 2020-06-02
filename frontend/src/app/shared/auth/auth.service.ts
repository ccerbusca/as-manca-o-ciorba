import {Injectable} from '@angular/core';
import {ConfigService} from '../config.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    return this.http.post(`${ConfigService.configuration.backendPath}/api/login`, user)
      .pipe(tap(_ => this.setSession(user)));
  }

  register(user: User): Observable<any> {
    return this.http.post(`${ConfigService.configuration.backendPath}/api/register`, user);
  }

  logout(): void {
    localStorage.removeItem('logged');
    localStorage.removeItem('username');
    localStorage.removeItem('expires_at');
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('logged') && moment().isBefore(this.getExpiration());
  }

  get currentUser(): string {
    return localStorage.getItem('username');
  }

  private setSession(user: User): void {
    localStorage.setItem('logged', 'true');
    localStorage.setItem('username', user.username);
    localStorage.setItem('expires_at', JSON.stringify(moment().add(100, 'minute').valueOf()));
  }

  private getExpiration(): moment.Moment {
    const expiration = localStorage.getItem('expires_at');
    return moment(JSON.parse(expiration));
  }
}
