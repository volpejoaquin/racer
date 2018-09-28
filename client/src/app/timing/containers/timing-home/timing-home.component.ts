// angular
import { Component, OnInit, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

// libs
import * as lodash from 'lodash';

// modules
import * as fromTiming from './../../reducers/';

// models
import {
  TrackLap,
  TrackActivity,
  RaceParticipantTrackActivity,
  RaceWeekend
} from '../../../shared/model/';

@Component({
  selector: 'racer-timing-home',
  templateUrl: './timing-home.component.html',
  styleUrls: ['./timing-home.component.scss']
})
export class TimingHomeComponent implements OnInit {
  raceWeekend$: Observable<RaceWeekend>;
  trackActivity$: Observable<TrackActivity>;
  // raceParticipantTrackActivities: RaceParticipantTrackActivity[];
  // bestTrackActivity: RaceParticipantTrackActivity;
  // bestLap: TrackLap;

  currentViewNumber = parseInt(localStorage.getItem('currentViewNumber'), 10) || 0;
  viewsCount = 4;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;

    switch (keyCode) {
      case 37:
        this.currentViewNumber = this.currentViewNumber === 0 ? (this.viewsCount - 1) : ((this.currentViewNumber - 1) % this.viewsCount);
        break;
      case 39:
        this.currentViewNumber = ((this.currentViewNumber + 1) % this.viewsCount);
        break;
    }

    localStorage.setItem('currentViewNumber', '' + this.currentViewNumber);
  }

  constructor(store: Store<fromTiming.State>) {

    this.raceWeekend$ = store.pipe(select(fromTiming.getSelectedRaceWeekend));

    this.trackActivity$ = store.pipe(select(fromTiming.getSelectedTrackActivity));

    // this.trackActivity$.subscribe((tActivity: TrackActivity) => {
    //   console.log('AAAAAAAA');
    //   this.loadTrackActivityTimes(tActivity);
    // });
  }

  ngOnInit(): void {
  }

  getBestLap(raceParticipantTrackActivities: RaceParticipantTrackActivity[]) {
    return raceParticipantTrackActivities && raceParticipantTrackActivities.length > 0 && raceParticipantTrackActivities[0].best_lap ?
      raceParticipantTrackActivities[0].best_lap :
      null;
  }

  // private loadTrackActivityTimes(trackActivity: TrackActivity) {
  //   this.raceParticipantTrackActivities = lodash.orderBy(trackActivity.race_participants_track_activities, 'best_lap.time');

  //   if (this.raceParticipantTrackActivities && this.raceParticipantTrackActivities.length > 0) {
  //     this.bestTrackActivity = this.raceParticipantTrackActivities[0];
  //     this.bestLap = this.bestTrackActivity.best_lap;
  //   }
  // }
}
