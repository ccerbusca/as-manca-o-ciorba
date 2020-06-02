import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth/auth.service';
import {ConferenceService} from '../shared/conference.service';
import {Conference} from '../shared/models/conference.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  conferences: Conference[];
  subscription: Subscription;

  constructor(private authService: AuthService,
              private conferenceService: ConferenceService,
              private router: Router) { }

  ngOnInit(): void {
    this.update();
    this.subscription = this.conferenceService.conferencesChanged.subscribe(_ => this.update());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  conferenceDetails(id: number): void {
    this.router.navigate([`/conference/${id}`]);
  }

  private update(): void {
    this.conferenceService.getConferences().subscribe(conferences => this.conferences = conferences);
  }
}
