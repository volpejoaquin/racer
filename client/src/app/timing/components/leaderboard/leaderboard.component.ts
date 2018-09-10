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
  TimingSocketEvent
} from '../../../shared/model/';

@Component({
  selector: 'racer-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  rows: any[] = [];
  bestLap: any = {
    time: 9802 + 23233 + 31718 + 20435,
    ref_lap: true,
    partials: [
      {
        time: 9802,
        sector: 1
      },
      {
        time: 23233,
        sector: 2
      },
      {
        time: 31718,
        sector: 3
      },
      {
        time: 20435,
        sector: 4
      }
    ]
  };
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
    return row.best_lap.time - this.rows[0].best_lap.time;
  }

  calculateInterval(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !this.bestLap) {
      return '';
    }
    // Calculate interval
    return row.best_lap.time - this.rows[index - 2].best_lap.time;
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
        console.log('Event: connected', data);
        break;
      case BasicSocketEvent.DISCONNECT:
        console.log('Event: disconnected', data);
        break;
      default:
        console.log('Event: ' + event, data);

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
