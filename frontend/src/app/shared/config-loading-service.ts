import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

export class Configuration {
  backendPath: string;
}

@Injectable()
export class ConfigLoadingService {
  private readonly CONFIG_URL = './assets/config/config.json';
  private configuration$: Observable<any>;

  constructor(private http: HttpClient) {
  }

  public loadConfiguration(): Observable<Configuration> {
    if (!this.configuration$) {
      this.configuration$ = this.http.get<Configuration>(this.CONFIG_URL).pipe(shareReplay(1));
    }
    return this.configuration$;
  }

}
