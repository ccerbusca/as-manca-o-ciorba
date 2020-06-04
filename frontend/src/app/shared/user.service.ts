import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from './models/user.model';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${ConfigService.configuration.backendPath}/api/users`);
  }

  getPCMemberByUsername(currentUser: string): Observable<User> {
    return this.http.post<User>(`${ConfigService.configuration.backendPath}/api/user`, currentUser)
      .pipe(catchError(e => throwError(e)));
  }
}
