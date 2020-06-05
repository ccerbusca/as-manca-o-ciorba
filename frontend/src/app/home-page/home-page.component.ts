import {Component, OnDestroy, OnInit} from '@angular/core';
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

  constructor(private conferenceService: ConferenceService,
              private router: Router) { }

  ngOnInit(): void {
    this.update();
    this.subscription = this.conferenceService.conferencesChanged.subscribe(_ => this.update());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  conferenceDetails(id: number): void {
    this.router.navigate([`/conference/${id}`]);
  }

  private update(): void {
    this.conferenceService.getConferences().subscribe(conferences => this.conferences = conferences);
  }
}
