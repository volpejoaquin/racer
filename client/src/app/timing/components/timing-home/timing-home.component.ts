// angular
import { Component, OnInit, HostListener } from '@angular/core';

// libs
import * as lodash from 'lodash';

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

// dummy data
import {
  TRACK_ACTIVITY,
  REF_LAP,
  EMPTY_RACE_PARTICIPANT_TRACK_ACTIVITY
} from '../../../shared/dummy';

const DUMMY_TRACK_ACTIVITYES = [];
lodash.times(40, () => { DUMMY_TRACK_ACTIVITYES.push(lodash.clone(EMPTY_RACE_PARTICIPANT_TRACK_ACTIVITY)) });


@Component({
  selector: 'racer-timing-home',
  templateUrl: './timing-home.component.html',
  styleUrls: ['./timing-home.component.css']
})
export class TimingHomeComponent implements OnInit {
  trackActivity: TrackActivity = TRACK_ACTIVITY;
  trackActivities: RaceParticipantTrackActivity[] = DUMMY_TRACK_ACTIVITYES;
  bestTrackActivity: RaceParticipantTrackActivity = null;
  bestLap: TrackLap = REF_LAP;

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

  constructor(private socketService: SocketService) { }

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

        const currentObjectIndex = lodash.findIndex(this.trackActivities, (value) => {
          return !value.race_participant || value.race_participant.number === data.race_participant.number;
        });

        if (currentObjectIndex >= 0) {
          this.trackActivities[currentObjectIndex] = data;
        } else {
          this.trackActivities.push(data);
        }

        this.trackActivities = lodash.orderBy(this.trackActivities, 'best_lap.time');

        // Set best lap
        if (this.trackActivities && this.trackActivities.length > 0 &&
          this.trackActivities[0].best_lap && this.trackActivities[0].best_lap.time) {
          this.bestTrackActivity = this.trackActivities[0];
          this.bestLap = this.trackActivities[0].best_lap;
        }
        break;
    }
  }
}
