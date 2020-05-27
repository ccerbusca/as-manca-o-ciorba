import {Injectable} from '@angular/core';
import {ConfigLoadingService, Configuration} from '../config-loading-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../user/shared/user.model';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private config: Configuration;

  constructor(private configLoader: ConfigLoadingService,
              private http: HttpClient) {
    configLoader.loadConfiguration().subscribe(config => this.config = config);
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.config.backendPath}/api/login`, user)
      .pipe(tap(_ => this.setSession(user)));
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.config.backendPath}/api/register`, user);
  }

  logout(): void {
    localStorage.removeItem('logged');
    localStorage.removeItem('username');
    localStorage.removeItem('expires_at');
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('logged') && moment().isBefore(this.getExpiration());
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
