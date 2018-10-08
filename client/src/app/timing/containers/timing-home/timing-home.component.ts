// angular
import { Component, OnInit, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

// modules
import * as fromRoot from './../../reducers/';
import {
  LoadRaceParticipantTrackActivities
} from './../../actions/race-participant-track-activity.actions';
import { LoadTrackActivities } from './../../actions/track-activitiy.actions';

// models
import {
  TrackActivity,
  RaceParticipantTrackActivity,
  IRaceWeekend,
  RaceParticipant
} from '../../../shared/model/';

@Component({
  selector: 'racer-timing-home',
  templateUrl: './timing-home.component.html',
  styleUrls: ['./timing-home.component.scss']
})
export class TimingHomeComponent implements OnInit {
  raceWeekend$: Observable<IRaceWeekend>;
  trackActivity$: Observable<TrackActivity>;
  raceParticipantsTrackActivities$: Observable<RaceParticipantTrackActivity[]>;
  bestRaceParticipantTrackActivity$: Observable<RaceParticipantTrackActivity>;

  raceParticipants: RaceParticipant[];

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

  constructor(store: Store<fromRoot.State>) {

    this.raceWeekend$ = store.pipe(select(fromRoot.getSelectedRaceWeekend));

    this.trackActivity$ = store.pipe(select(fromRoot.getSelectedTrackActivity));

    this.raceParticipantsTrackActivities$ = store.pipe(select(fromRoot.getRaceParticipantsTrackActivitiesArray));

    this.bestRaceParticipantTrackActivity$ = store.pipe(select(fromRoot.getBestRaceParticipantTrackActivity));

    this.trackActivity$.subscribe((selectedTrackActivity: TrackActivity) => {

      if (selectedTrackActivity && selectedTrackActivity.race_participants_track_activities) {
        store.dispatch(new LoadRaceParticipantTrackActivities(selectedTrackActivity.race_participants_track_activities));
      }
    });

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

  ngOnInit(): void {
  }
}
