import * as socketIo from 'socket.io';

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

    this.getRaceWeekends();
  }
  
  private start() {
    // emit init event
    this.socket.emit(RacerSocketEvent.INIT, this.currentState);
    console.log('EMIT - [' + RacerSocketEvent.INIT + ']', this.currentState);
  }

  private getRaceWeekends() {
    
    RaceWeekend.find({}, (err, raceWeekends) => {
      if (err || !raceWeekends || raceWeekends.length === 0) {
        return;
      }

      let initialState = {
        ids: [],
        entities: []
      };

      raceWeekends.forEach((raceWeekend: IRaceWeekend) => {
        initialState.ids.push(raceWeekend.id);
        initialState.entities[raceWeekend.id] = raceWeekend;
      })

      this.currentState.timing.raceWeekends = initialState;

      this.start(); // TODO: REVIEW THIS
    });
  }
}