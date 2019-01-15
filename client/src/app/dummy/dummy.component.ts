// angular
import { Component, OnInit, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as lodash from 'lodash';

// store
import * as fromRoot from './../core/reducers/';
import * as fromTiming from './../timing/reducers/';
import {
  ImportRaceParticipantTrackActivities,
  LoadRaceParticipantTrackActivities,
  SetBestRaceParticipantTrackActivity
} from './../timing/actions/race-participant-track-activity.actions';
import { LoadRaceWeekends } from './../timing/actions/race-weekend.actions';
import { LoadTrackActivities } from './../timing/actions/track-activitiy.actions';
import { MarkRaceParticipant } from '../core/actions/ui.actions';

// models
import {
  RaceWeekend,
  TrackActivity,
  RaceParticipantTrackActivity,
  TrackLap,
  RaceParticipant
} from './../shared/model';

// dummy data
import { RACE_WEEKENDS_SAMPLE } from './../dummy';
import { LiveTiming } from './live-timing';

const LIVE_TIMING_KEY_CODES = [76, 73, 86, 69];
// const LIVE_TIMING_KEY_CODES = [76];
let CURRENT_CODES = [];

@Component({
  selector: 'racer-dummy',
  template: ``
})
export class DummyComponent implements OnInit {

  private raceWeekends: RaceWeekend[];
  private trackActivities: TrackActivity[];
  private raceParticipants: RaceParticipant[] = [];
  private bestRaceParticipantTrackActivity: RaceParticipantTrackActivity;

  private raceWeekend$: Observable<RaceWeekend>;
  private bestRaceParticipantTrackActivity$: Observable<RaceParticipantTrackActivity>;
  private raceParticipantsTrackActivities$: Observable<RaceParticipantTrackActivity[]>;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;
    CURRENT_CODES.push(keyCode);

    if (CURRENT_CODES.length > LIVE_TIMING_KEY_CODES.length) {
      CURRENT_CODES = CURRENT_CODES.slice(1, CURRENT_CODES.length);
    }

    if (lodash.isEqual(CURRENT_CODES, LIVE_TIMING_KEY_CODES)) {
      CURRENT_CODES = [];

      if (this.bestRaceParticipantTrackActivity && this.bestRaceParticipantTrackActivity.best_lap) {
        this.startLiveTiming(this.bestRaceParticipantTrackActivity.best_lap, this.raceParticipants);
      }
    }
  }

  constructor(private store: Store<fromRoot.State>) {
    this.bestRaceParticipantTrackActivity$ = store.pipe(select(fromTiming.getBestRaceParticipantTrackActivity));
    this.raceParticipantsTrackActivities$ = store.pipe(select(fromTiming.getRaceParticipantsTrackActivitiesArray));

    this.bestRaceParticipantTrackActivity$.subscribe((bestRaceParticipantTrackActivity: RaceParticipantTrackActivity) => {
      this.bestRaceParticipantTrackActivity = bestRaceParticipantTrackActivity;
    });

    this.raceParticipantsTrackActivities$.subscribe((raceParticipantsTrackActivities: RaceParticipantTrackActivity[]) => {

      raceParticipantsTrackActivities.forEach((raceParticipantTrackActivity: RaceParticipantTrackActivity) => {

        if (raceParticipantTrackActivity.race_participant) {
          this.raceParticipants.push(raceParticipantTrackActivity.race_participant);
        }
      });
    });
  }

  ngOnInit() {
    // TODO: REMOVE THIS
    const reload = true;

    if (reload) {
      this.raceWeekends = RACE_WEEKENDS_SAMPLE;
      localStorage.setItem('race_weekends', JSON.stringify(this.raceWeekends));
    } else {
      this.raceWeekends = JSON.parse(localStorage.getItem('race_weekends'));
    }
    this.loadRaceWeekends(this.raceWeekends);

    this.raceWeekend$ = this.store.pipe(select(fromTiming.getSelectedRaceWeekend));
    this.raceWeekend$.subscribe((selectedRaceWeekend: RaceWeekend) => {

      if (selectedRaceWeekend) {
        const trackActivities: TrackActivity[] = this.getTrackActivities(selectedRaceWeekend);
        this.loadTrackActivities(trackActivities);
      }
    });

    const raceParticipantsTrackActivities$ = this.store.pipe(select(fromTiming.getRaceParticipantsTrackActivitiesArray));
    raceParticipantsTrackActivities$.subscribe((_raceParticipantsTrackActivities: RaceParticipantTrackActivity[]) => {

      if (this.raceWeekends) {
        localStorage.setItem('race_weekends_back', localStorage.getItem('race_weekends'));
        localStorage.setItem('race_weekends', JSON.stringify(this.raceWeekends));
      }
    });
  }

  private loadRaceWeekends(raceWeekends: RaceWeekend[]) {
    this.raceWeekends = raceWeekends;

    // const raceWeekendsCopy: RaceWeekend[] = [];
    // let raceWeekend: RaceWeekend;

    // raceWeekends.forEach((rWeekend: RaceWeekend) => {
      // raceWeekend = lodash.clone(rWeekend);
      // delete raceWeekend.track_activities; TODO: REVIEW THIS
      // raceWeekendsCopy.push(raceWeekend);
    // });
    this.store.dispatch(new LoadRaceWeekends(raceWeekends));
  }

  private loadTrackActivities(trackActivities: TrackActivity[]) {
    this.trackActivities = trackActivities;

    // const trackActivitiesCopy: TrackActivity[] = [];
    // let trackActivity: TrackActivity;

    // trackActivities.forEach((tActivity: TrackActivity) => {
      // trackActivity = lodash.clone(tActivity);
      // trackActivity.race_participants_track_activities = []; TODO: REVIEW THIS
      // trackActivitiesCopy.push(trackActivity);
    // });
    this.store.dispatch(new LoadTrackActivities(trackActivities));
  }

  private loadRaceParticipantsTrackActivities(raceParticipantstrackActivities: RaceParticipantTrackActivity[]) {
    this.store.dispatch(new LoadRaceParticipantTrackActivities(raceParticipantstrackActivities));
  }

  private importRaceParticipantsTrackActivities(raceParticipantstrackActivities: RaceParticipantTrackActivity[]) {
    this.store.dispatch(new ImportRaceParticipantTrackActivities(raceParticipantstrackActivities));
  }

  private getTrackActivities(raceWeekend: RaceWeekend) {
    const rWeekend: RaceWeekend = lodash.find(this.raceWeekends, (rW: RaceWeekend) => {
      return rW.id === raceWeekend.id;
    });
    return rWeekend && rWeekend.track_activities ? rWeekend.track_activities : [];
  }

  private startLiveTiming(bestTrackLap: TrackLap, raceParticipants: RaceParticipant[]) {
    const rParticipants = lodash.clone(raceParticipants).slice(0, 3);

    const allData = [];
    const output = (event: any, data: any) => {
        console.log('EVENT', event, data);

        if (data) {
          allData.push(data);

          this.loadRaceParticipantsTrackActivities(allData);
        }
      };
    const liveTiming = new LiveTiming(output);
    liveTiming.start(bestTrackLap, rParticipants);

    this.importRaceParticipantsTrackActivities([]);

    rParticipants.forEach((raceParticipant: RaceParticipant) => {
      this.store.dispatch(new MarkRaceParticipant(raceParticipant.number));
    });
  }
}
