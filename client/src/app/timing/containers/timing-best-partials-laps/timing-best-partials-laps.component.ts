// angular
import { Component, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

// modules
import * as fromRoot from './../../reducers/';

// models
import {
  TrackActivity,
  RaceParticipantTrackActivity
} from '../../../shared/model/';

@Component({
  selector: 'racer-timing-best-partials-laps',
  templateUrl: './timing-best-partials-laps.component.html'
})
export class TimingBestPartialsLapsComponent {
  trackActivity$: Observable<TrackActivity>;
  raceParticipantsTrackActivities$: Observable<RaceParticipantTrackActivity[]>;
  bestRaceParticipantTrackActivity$: Observable<RaceParticipantTrackActivity>;

  constructor(store: Store<fromRoot.State>) {
    this.trackActivity$ = store.pipe(select(fromRoot.getSelectedTrackActivity));

    this.raceParticipantsTrackActivities$ = store.pipe(select(fromRoot.getRaceParticipantsTrackActivitiesArray));

    this.bestRaceParticipantTrackActivity$ = store.pipe(select(fromRoot.getBestRaceParticipantTrackActivity));
  }
}
