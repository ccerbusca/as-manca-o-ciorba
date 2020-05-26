import {Injectable} from '@angular/core';
import {User} from './user.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  save(user: User): Observable<User> {
    console.log(user);
    return of(user);
  }

}
