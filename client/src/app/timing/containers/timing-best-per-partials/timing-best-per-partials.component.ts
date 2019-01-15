// angular
import { Component, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

// modules
import * as fromRoot from './../../reducers/';

// models
import {
  RaceParticipantTrackActivity
} from '../../../shared/model/';

@Component({
  selector: 'racer-timing-best-per-partials',
  templateUrl: './timing-best-per-partials.component.html'
})
export class TimingBestPerPartialsComponent {
  raceParticipantsTrackActivities$: Observable<RaceParticipantTrackActivity[]>;
  bestRaceParticipantTrackActivity$: Observable<RaceParticipantTrackActivity>;

  constructor(store: Store<fromRoot.State>) {
    this.raceParticipantsTrackActivities$ = store.pipe(select(fromRoot.getRaceParticipantsTrackActivitiesArray));

    this.bestRaceParticipantTrackActivity$ = store.pipe(select(fromRoot.getBestRaceParticipantTrackActivity));
  }
}
