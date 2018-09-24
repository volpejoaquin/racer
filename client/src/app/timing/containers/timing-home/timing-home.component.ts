// angular
import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

// libs
import * as lodash from 'lodash';

// modules
import * as fromTiming from './../../reducers/';

// services
import { SocketService } from '../../../core/service';

// models
import {
  TrackLap,
  TrackActivity,
  RaceParticipantTrackActivity,
  SocketEvent,
  BasicSocketEvent,
  TimingSocketEvent,
  TrackActivitySocketEvent
} from '../../../shared/model/';

@Component({
  selector: 'racer-timing-home',
  templateUrl: './timing-home.component.html',
  styleUrls: ['./timing-home.component.scss']
})
export class TimingHomeComponent implements OnInit {
  trackActivity: TrackActivity;
  raceParticipantTrackActivities: RaceParticipantTrackActivity[];
  bestTrackActivity: RaceParticipantTrackActivity;
  bestLap: TrackLap;

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

  constructor(private socketService: SocketService,
    store: Store<fromTiming.State>) {

    store.select('timing').subscribe((state: any) => {
      console.log(state);
      // // Check if selected track activity is set
      // if (state.selected_) {
      //   this.loadTrackActivity(state.timing.selected_track_activity);
      // }
    });
  }

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onEvent(BasicSocketEvent.CONNECT)
      .subscribe((data: any) => {
        this.onEvent(BasicSocketEvent.CONNECT, data);
      });

    this.socketService.onEvent(BasicSocketEvent.DISCONNECT)
      .subscribe((data: any) => {
        this.onEvent(BasicSocketEvent.DISCONNECT, data);
      });

    this.socketService.onEvent(TrackActivitySocketEvent.STARTED)
      .subscribe((data: any) => {
        this.onEvent(TrackActivitySocketEvent.STARTED, data);
      });

    this.socketService.onEvent(TrackActivitySocketEvent.CAUTION)
      .subscribe((data: any) => {
        this.onEvent(TrackActivitySocketEvent.CAUTION, data);
      });

    this.socketService.onEvent(TrackActivitySocketEvent.STOPPED)
      .subscribe((data: any) => {
        this.onEvent(TrackActivitySocketEvent.STOPPED, data);
      });

    this.socketService.onEvent(TrackActivitySocketEvent.FINISHED)
      .subscribe((data: any) => {
        this.onEvent(TrackActivitySocketEvent.STOPPED, data);
      });

    this.socketService.onEvent(TimingSocketEvent.GO_TO_TRACK)
      .subscribe((data: any) => {
        this.onEvent(TimingSocketEvent.GO_TO_TRACK, data);
      });

    this.socketService.onEvent(TimingSocketEvent.GO_TO_PIT)
      .subscribe((data: any) => {
        this.onEvent(TimingSocketEvent.GO_TO_PIT, data);
      });

    this.socketService.onEvent(TimingSocketEvent.PARTIAL_LAP_TIME)
      .subscribe((data: any) => {
        this.onEvent(TimingSocketEvent.PARTIAL_LAP_TIME, data);
      });

    this.socketService.onEvent(TimingSocketEvent.LAP_TIME)
      .subscribe((data: any) => {
        this.onEvent(TimingSocketEvent.LAP_TIME, data);
      });
  }

  private onEvent(event: SocketEvent, data: any) {

    console.log(event);

    switch (event) {
      case BasicSocketEvent.CONNECT:
        // console.log('Event: connected', data);
        break;
      case BasicSocketEvent.DISCONNECT:
        // console.log('Event: disconnected', data);
        break;
      case TrackActivitySocketEvent.STARTED:
      case TrackActivitySocketEvent.CAUTION:
      case TrackActivitySocketEvent.STOPPED:
      case TrackActivitySocketEvent.FINISHED:
        this.trackActivity = data;
        break;
      default:
        // console.log('Event: ' + event, data);

        const currentObjectIndex = lodash.findIndex(this.raceParticipantTrackActivities, (value) => {
          return !value.race_participant || value.race_participant.number === data.race_participant.number;
        });

        if (currentObjectIndex >= 0) {
          this.raceParticipantTrackActivities[currentObjectIndex] = data;
        } else {
          this.raceParticipantTrackActivities.push(data);
        }

        this.raceParticipantTrackActivities = lodash.orderBy(this.raceParticipantTrackActivities, 'best_lap.time');

        // Set best lap
        if (this.raceParticipantTrackActivities && this.raceParticipantTrackActivities.length > 0 &&
          this.raceParticipantTrackActivities[0].best_lap && this.raceParticipantTrackActivities[0].best_lap.time) {
          this.bestTrackActivity = this.raceParticipantTrackActivities[0];
          this.bestLap = this.raceParticipantTrackActivities[0].best_lap;
        }
        break;
    }
  }

  private loadTrackActivity(trackActivity: TrackActivity) {
    this.trackActivity = trackActivity;

    if (this.trackActivity) {
      this.raceParticipantTrackActivities = lodash.orderBy(this.trackActivity.race_participants_track_activities, 'best_lap.time');
      this.bestLap = this.trackActivity.best_lap;
    }
  }
}
