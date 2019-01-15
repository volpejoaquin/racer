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
import { LoadTrackActivities, ChangeStateSelectedTrackActivity } from './../timing/actions/track-activitiy.actions';
import { MarkRaceParticipant } from '../core/actions/ui.actions';

// models
import {
  RaceWeekend,
  TrackActivity,
  RaceParticipantTrackActivity,
  TrackLap,
  RaceParticipant,
  TrackActivityState
} from './../shared/model';

// dummy data
import { RACE_WEEKENDS_SAMPLE, TP_C3_RACE_PARTICIPANTS } from './../dummy';
import { LiveTiming } from './live-timing';
import { BEST_TRACK_LAP } from './best-track-lap';

// const LIVE_TIMING_KEY_CODES = [76, 73, 86, 69];
const LIVE_TIMING_KEY_CODES = [76];
const RACE_PARTICIPANTS_COUNT = 8;
const MAX_TOTAL_LAPS = 6;
const SPEED = 10;
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

      this.startLiveTiming(BEST_TRACK_LAP, TP_C3_RACE_PARTICIPANTS);
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

    setTimeout(() => {
      this.startLiveTiming(BEST_TRACK_LAP, TP_C3_RACE_PARTICIPANTS);
    }, 2000);
  }

  ngOnInit() {
    const raceWeekends = lodash.cloneDeep(RACE_WEEKENDS_SAMPLE);
    this.loadRaceWeekends(raceWeekends);
  }

  private loadRaceWeekends(raceWeekends: RaceWeekend[]) {
    this.raceWeekends = raceWeekends;
    this.store.dispatch(new LoadRaceWeekends(raceWeekends));
  }

  private loadRaceParticipantsTrackActivities(raceParticipantstrackActivities: RaceParticipantTrackActivity[]) {
    this.store.dispatch(new LoadRaceParticipantTrackActivities(raceParticipantstrackActivities));
  }

  private importRaceParticipantsTrackActivities(raceParticipantstrackActivities: RaceParticipantTrackActivity[]) {
    this.store.dispatch(new ImportRaceParticipantTrackActivities(raceParticipantstrackActivities));
  }

  private startTrackActivity() {
    this.store.dispatch(new ChangeStateSelectedTrackActivity(TrackActivityState.started));
  }

  private finishTrackActivity() {
    this.store.dispatch(new ChangeStateSelectedTrackActivity(TrackActivityState.finished));
  }

  private getTrackActivities(raceWeekend: RaceWeekend) {
    const rWeekend: RaceWeekend = lodash.find(this.raceWeekends, (rW: RaceWeekend) => {
      return rW.id === raceWeekend.id;
    });
    return rWeekend && rWeekend.track_activities ? rWeekend.track_activities : [];
  }

  private startLiveTiming(bestTrackLap: TrackLap, raceParticipants: RaceParticipant[]) {
    const rParticipants = lodash.clone(raceParticipants).slice(0, RACE_PARTICIPANTS_COUNT);

    const allData = [];
    const output = (event: any, data: any) => {
        switch(event) {
          case LiveTiming.TRACK_ACTIVITY_STARTED:
            this.startTrackActivity();
            break;
            case LiveTiming.TRACK_ACTIVITY_FINISHED:
            this.finishTrackActivity();
            break;
          default:
            if (data) {
              allData.push(data);
              this.loadRaceParticipantsTrackActivities(allData);
            }
            break;
        }
      };
    const liveTiming = new LiveTiming(output);
    liveTiming.start(bestTrackLap, rParticipants, MAX_TOTAL_LAPS, SPEED);

    rParticipants.forEach((raceParticipant: RaceParticipant) => {
      this.store.dispatch(new MarkRaceParticipant(raceParticipant.number));
    });
  }
}
