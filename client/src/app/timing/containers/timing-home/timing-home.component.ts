// angular
import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// modules
import * as fromRoot from './../../reducers/';
import {
  LoadRaceParticipantTrackActivities
} from './../../actions/race-participant-track-activity.actions';

// models
import {
  TrackActivity,
  RaceParticipantTrackActivity,
  RaceWeekend,
  RaceParticipant
} from '../../../shared/model/';

@Component({
  selector: 'racer-timing-home',
  templateUrl: './timing-home.component.html',
  styleUrls: ['./timing-home.component.scss']
})
export class TimingHomeComponent implements OnDestroy {
  raceWeekend$: Observable<RaceWeekend>;
  trackActivity$: Observable<TrackActivity>;
  raceParticipantsTrackActivities$: Observable<RaceParticipantTrackActivity[]>;
  bestRaceParticipantTrackActivity$: Observable<RaceParticipantTrackActivity>;

  raceParticipants: RaceParticipant[];
  title = 'Loading...'

  // private properties
  private currentViewNumber = parseInt(localStorage.getItem('currentViewNumber'), 10) || 0;
  private views = ['leaderboard', 'partials', 'best-per-partials', 'laps', 'analysis'];
  private viewsCount = this.views.length;
  private subscription: any;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;
    switch (keyCode) {
      case 37:
        this.moveNext()
        break;
      case 39:
        this.movePrev();
        break;
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) {
    this.bindStore();
    this.navigateToView();

    this.subscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data) {
              return child.snapshot.data;
            } else {
              return null;
            }
          }
          return null;
        })
      ).subscribe((data: any) => {
        this.title = data.title;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.destroy();
    }
  }

  // private methods
  private bindStore() {
    this.raceWeekend$ = this.store.pipe(select(fromRoot.getSelectedRaceWeekend));

    this.trackActivity$ = this.store.pipe(select(fromRoot.getSelectedTrackActivity));

    this.raceParticipantsTrackActivities$ = this.store.pipe(select(fromRoot.getRaceParticipantsTrackActivitiesArray));

    this.bestRaceParticipantTrackActivity$ = this.store.pipe(select(fromRoot.getBestRaceParticipantTrackActivity));

    this.raceParticipantsTrackActivities$.subscribe((raceParticipantsTrackActivities: RaceParticipantTrackActivity[]) => {
      if (raceParticipantsTrackActivities) {
        this.raceParticipants = [];

        raceParticipantsTrackActivities.forEach((raceParticipantTrackActivity: RaceParticipantTrackActivity) => {

          if (raceParticipantTrackActivity.race_participant) {
            this.raceParticipants.push(raceParticipantTrackActivity.race_participant);
          } else {
            console.log('WARNING ! ', raceParticipantTrackActivity);
          }
        });
      }
    });
  }

  private moveNext() {
    this.currentViewNumber = this.currentViewNumber === 0 ? (this.viewsCount - 1) : ((this.currentViewNumber - 1) % this.viewsCount);

    localStorage.setItem('currentViewNumber', '' + this.currentViewNumber);
    this.navigateToView();
  }

  private movePrev() {
    this.currentViewNumber = ((this.currentViewNumber + 1) % this.viewsCount);

    localStorage.setItem('currentViewNumber', '' + this.currentViewNumber);
    this.navigateToView();
  }

  private navigateToView() {
    const viewPath = this.views[this.currentViewNumber];
    this.router.navigate([viewPath], { relativeTo: this.activatedRoute});
  }
}
