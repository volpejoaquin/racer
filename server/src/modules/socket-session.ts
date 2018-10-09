import * as socketIo from 'socket.io';
import * as lodash from 'lodash';

// models
import { RacerSocketEvent, IRaceWeekend } from './../interfaces/';
import { RaceWeekend } from './../models/';

export class SocketSession {
  private socket: SocketIO.Socket;
  private code: string;
  private currentState: any = {
    ui: {
      socketConnected: true,
      raceParticipants: {
        invisible: [],
        dimmed: [91, 110]
      }
    },
    layout: {
      showSidenav: false
    },
    timing: {
      raceWeekends: {
        ids: [],
        entities: []
      },
      trackActivities: {
        ids: [],
        entities: []
      },
      raceParticipantsTrackActivities: {
        ids: [],
        entities: []
      }
    }
  };

  constructor(socket: SocketIO.Socket, code: string) {
    this.socket = socket;
    this.code = code;

    console.log('INFO - New socket session. CODE:', code);

    // this.getRaceWeekends();
  }
  
  private start() {
    // emit init event
    // this.socket.emit(RacerSocketEvent.INIT, this.currentState);
    console.log('EMIT - [' + RacerSocketEvent.INIT + ']', this.currentState);
  }

  private getRaceWeekends() {
    
    RaceWeekend.find({}, (err, raceWeekends) => {
      if (err || !raceWeekends || raceWeekends.length === 0) {
        return;
      }

      let ids: string[] = [],
        entities: {[key: string]: IRaceWeekend} = {};

      raceWeekends.forEach((raceWeekend: IRaceWeekend) => {
        ids.push(raceWeekend.id);
        entities[raceWeekend.id] = raceWeekend;
      });

      this.currentState.timing.raceWeekends.ids = ids;
      this.currentState.timing.raceWeekends.entities = entities;

      this.start(); // TODO: REVIEW THIS
    });
  }
}