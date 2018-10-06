import * as socketIo from 'socket.io';

// models
import { RacerSocketEvent } from './../interfaces/';
import { RaceWeekend } from './../models/';
import { raceWeekendsAdapter } from './adapters';

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
      raceWeekends: null,
      trackActivities: null,
      raceParticipantsTrackActivities: null
    }
  };

  constructor(socket: SocketIO.Socket, code: string) {
    this.socket = socket;
    this.code = code;

    console.log('INFO - New socket session. CODE:', code);
  }
  
  private start() {
    const initAppState: any = {
      ui: {
        socketConnected: true,
        raceParticipants: {
          invisible: [],
          dimmed: [91, 110]
        }
      },
      timing: {
        raceWeekends: this.getRaceWeekends(),
        trackActivities: [],
        raceParticipantsTrackActivities: []
      }
    };
    // emit init event
    this.socket.emit(RacerSocketEvent.INIT, initAppState);
    console.log('EMIT - [' + RacerSocketEvent.INIT + ']', initAppState);
  }

  private getRaceWeekends() {
    
    RaceWeekend.find({}, (err, raceWeekends) => {
      if (err || !raceWeekends || raceWeekends.length === 0) {
        return;
      }

      let initialState = raceWeekendsAdapter.getInitialState({
        selectedRaceWeekendId: raceWeekends[0].id,
      });
      initialState = raceWeekendsAdapter.addAll(raceWeekends, initialState);

      this.currentState.timing.raceWeekends = initialState;

      this.start(); // TODO: REVIEW THIS
    });
  }
}