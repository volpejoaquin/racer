import { Component, OnInit } from '@angular/core';
import * as lodash from 'lodash';

import { Event } from './shared/model/event';
import { SocketService } from './shared/services/socket.service';

import { RaceParticipantTrackActivity } from './../../../../server/src/models/track-activity.model';

@Component({
  selector: 'tcc-timing',
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.css']
})
export class TimingComponent implements OnInit {
  rows: any[] = [];
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.initModel();
    this.initIoConnection();
  }

  calculateGap(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !this.rows || this.rows.length === 0 || !row.best_lap) {
      return '';
    }
    // Calculate gap
    return row.best_lap.time - this.rows[0].best_lap.time;
  }

  calculateInterval(index: number, row: RaceParticipantTrackActivity) {
    if (index === 1 || !this.rows || this.rows.length === 0 || !row.best_lap) {
      return '';
    }
    // Calculate interval
    return row.best_lap.time - this.rows[index - 2].best_lap.time;
  }

  private initModel(): void {
  }

  private initIoConnection(): void {
    this.socketService.initSocket();


    this.socketService.onEvent(Event.CONNECT)
      .subscribe((data: any) => {
        this.onEvent(Event.CONNECT, data);
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe((data: any) => {
        this.onEvent(Event.DISCONNECT, data);
      });

    this.socketService.onEvent(Event.GO_TO_TRACK)
      .subscribe((data: any) => {
        this.onEvent(Event.GO_TO_TRACK, data);
      });

    this.socketService.onEvent(Event.GO_TO_PIT)
      .subscribe((data: any) => {
        this.onEvent(Event.GO_TO_PIT, data);
      });

    this.socketService.onEvent(Event.PARTIAL_LAP_TIME)
      .subscribe((data: any) => {
        this.onEvent(Event.PARTIAL_LAP_TIME, data);
      });

    this.socketService.onEvent(Event.LAP_TIME)
      .subscribe((data: any) => {
        this.onEvent(Event.LAP_TIME, data);
      });
  }

  private onEvent(event: Event, data: any) {

    switch (event) {
      case Event.CONNECT:
        console.log('Event: connected', data);
        break;
      case Event.DISCONNECT:
        console.log('Event: disconnected', data);
        break;
      default:
        console.log('Event: ' + event, data);

        const currentObject = lodash.find(this.rows, (value) => {
          return value.race_participant.number === data.race_participant.number;
        });

        if (!!currentObject) {
          lodash.assign(currentObject, data);
        } else {
          this.rows.push(data);
        }
        break;
    }
  }
}
