// angular
import { Component, OnInit, OnChanges, Input } from '@angular/core';

// libs
import { Store, select } from '@ngrx/store';

// modules
import * as fromTiming from '../../../timing/reducers';

// actions
import { RaceParticipantTrackActivityActions } from '../../../timing/actions';

// models
import {
  RaceWeekend,
  TrackActivity,
  RaceParticipantTrackActivity
} from '../../../shared/model';

// dummy data

@Component({
  selector: 'racer-race-weekend',
  templateUrl: './race-weekend.component.html',
  styleUrls: ['./race-weekend.component.scss']
})
export class RaceWeekendComponent implements OnInit, OnChanges {
  @Input() raceWeekend: RaceWeekend;

  selectedTrackActivity: TrackActivity;

  constructor(private store: Store<fromTiming.State>) {
    store.pipe(select(fromTiming.getSelectedTrackActivity)).subscribe((tActivity: TrackActivity) => {
      this.selectedTrackActivity = tActivity;
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  onRaceParticipantsTrackActivitiesLoaded(raceParticipantsTrackActivites: RaceParticipantTrackActivity[]) {

    this.store.dispatch(new RaceParticipantTrackActivityActions.LoadRaceParticipantTrackActivities(raceParticipantsTrackActivites));
  }
}
