import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth/auth.service';
import {ConferenceService} from '../user/shared/conference.service';
import {Conference} from '../user/shared/conference.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  conferences: Conference[];

  constructor(private authService: AuthService,
              private conferenceService: ConferenceService,
              private router: Router) { }

  ngOnInit(): void {
    this.conferenceService.getConferences().subscribe(conferences => this.conferences = conferences);
  }

  get isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  conferenceDetails(id: number): void {
    this.router.navigate([`/conference/${id}`]);
  }
}
