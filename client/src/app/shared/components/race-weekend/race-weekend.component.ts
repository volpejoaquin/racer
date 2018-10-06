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
  IRaceWeekend,
  TrackActivity,
  RaceParticipantTrackActivity
} from '../../../shared/model';
import { Observable } from 'rxjs';

// dummy data

@Component({
  selector: 'racer-race-weekend',
  templateUrl: './race-weekend.component.html',
  styleUrls: ['./race-weekend.component.scss']
})
export class RaceWeekendComponent implements OnInit, OnChanges {
  @Input() raceWeekend: IRaceWeekend;
  trackActivities$: Observable<TrackActivity>;

  selectedTrackActivity: TrackActivity;

  constructor(private store: Store<fromTiming.State>) {
  }

  ngOnInit() {
    this.store.select(fromTiming.getSelectedTrackActivity).subscribe((tActivity: TrackActivity) => {
      this.selectedTrackActivity = tActivity;
    });

    this.trackActivities$ = this.store.pipe(select(fromTiming.getTrackActivitiesArray));
  }

  ngOnChanges() {
  }

  onRaceParticipantsTrackActivitiesLoaded(raceParticipantsTrackActivites: RaceParticipantTrackActivity[]) {

    this.store.dispatch(new RaceParticipantTrackActivityActions.ImportRaceParticipantTrackActivities(raceParticipantsTrackActivites));
  }
}
