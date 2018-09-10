// angular
import { Component, OnInit } from '@angular/core';

// libs
import * as lodash from 'lodash';

// services
import { SocketService } from '../../../core/service';

// models
import {
  RaceParticipantTrackActivity,
  SocketEvent,
  BasicSocketEvent,
  TimingSocketEvent,
  TrackLap,
  TrackPartialLap
} from '../../../shared/model/';

// dummy data
import { REF_LAP } from '../../../shared/dummy/';

@Component({
  selector: 'racer-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  rows: RaceParticipantTrackActivity[] = [];
  bestLap: TrackLap = REF_LAP;
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.initIoConnection();
  }

  calculateGap(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !this.bestLap) {
      return '';
    }
    // Calculate gap
    return row.best_lap.time - this.bestLap.time;
  }

  calculateInterval(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !this.bestLap) {
      return '';
    }
    // Calculate interval
    return row.best_lap.time - this.rows[index - 2].best_lap.time;
  }

  calculateGapCurrentLap(index: number, row: RaceParticipantTrackActivity) {
    if (
      !this.bestLap ||
      !row.last_lap ||
      !row.last_lap.partials ||
      row.last_lap.partials.length === 0
    ) {
      return 0;
    }
    let current_lap_time = 0,
      best_partial_time = 0;

    row.last_lap.partials.forEach((partial: TrackPartialLap, partialIndex: number) => {
      current_lap_time += partial.time;
      best_partial_time += this.bestLap.partials[partialIndex].time;
    });

    // Calculate gap
    return current_lap_time - best_partial_time;
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

    switch (event) {
      case BasicSocketEvent.CONNECT:
        // console.log('Event: connected', data);
        break;
      case BasicSocketEvent.DISCONNECT:
        // console.log('Event: disconnected', data);
        break;
      default:
        // console.log('Event: ' + event, data);

        const currentObjectIndex = lodash.findIndex(this.rows, (value) => {
          return value.race_participant.number === data.race_participant.number;
        });

        if (currentObjectIndex >= 0) {
          this.rows[currentObjectIndex] = data;
        } else {
          this.rows.push(data);
        }
        break;
    }

    this.rows = lodash.orderBy(this.rows, 'best_lap.time');

    if (this.rows[0] && this.rows[0].best_lap && this.rows[0].best_lap.time) {
      this.bestLap = this.rows[0].best_lap;
    }
  }
}
