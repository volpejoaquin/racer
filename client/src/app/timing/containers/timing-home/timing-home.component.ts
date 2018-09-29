// angular
import { Component, OnInit, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

// libs

// modules
import * as fromTiming from './../../reducers/';

// models
import {
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
  raceParticipantsTrackActivities$: Observable<RaceParticipantTrackActivity[]>;
  bestRaceParticipantTrackActivity$: Observable<RaceParticipantTrackActivity>;

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

    this.raceParticipantsTrackActivities$ = store.pipe(select(fromTiming.getRaceParticipantsTrackActivitiesArray));

    this.bestRaceParticipantTrackActivity$ = store.pipe(select(fromTiming.getBestRaceParticipantTrackActivity));
  }

  ngOnInit(): void {
  }
}
