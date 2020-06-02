import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export class Configuration {
  backendPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static configuration: Configuration;
  private readonly CONFIG_URL = './assets/config/config.json';

  constructor(private http: HttpClient) {
  }

  public loadConfiguration(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<Configuration>(this.CONFIG_URL).toPromise().then(config => {
        ConfigService.configuration = config;
        resolve();
      }).catch(response => reject('Could not load config'));
    });
  }

}
