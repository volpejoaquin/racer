// libs
import * as lodash from 'lodash';
import * as socketIo from 'socket.io';

// models
import {
  TrackActivity,
  TrackLap,
  TrackPartialLap,
  RaceParticipant,
  RaceParticipantTrackActivity,
  RaceParticipantTrackActivityState,
  TrackActivitySocketEvent,
  TimingSocketEvent,
  TrackActivityState
} from '../model/';

// dummy data
import {
  TRACK_ACTIVITY,
  RACE_PARTICIPANTS,
  TRACK_ACTIVITY_DELAY,
  TRACK_ACTIVITY_SECTORS,
  REF_LAP_PARTIALS,
  PARTICIPANTS,
  LAP_PARTIALS_ESTIMATED_ERROR_MIN,
  LAP_PARTIALS_ESTIMATED_ERROR_MAX
} from './dummy-data';

const LOG = true;
const DISABLE_TRACK_STATE_CHANGES = true;

export class TimingDummy {
  private io: SocketIO.Server;
  private trackActivity: TrackActivity = TRACK_ACTIVITY;
  private participants: RaceParticipant[] = lodash.clone(RACE_PARTICIPANTS);
  private timeouts: any[] = [];

  constructor(io: SocketIO.Server) {
    this.io = io;
  }

  start() {
    this.setTimeout(
      () => {
        this.startTrackActivity();

        this.setTimeout(
          () => {
            this.finishTrackActivity();
          },
          this.trackActivity.duration
        );
      },
      5000
    );

    if (DISABLE_TRACK_STATE_CHANGES) {
      return;
    }

    this.setTimeout(
      () => {
        this.cautionTrackActivity();
      },
      60000
    );

    this.setTimeout(
      () => {
        this.stopTrackActivity();
      },
      120000
    );
  }

  stop() {
    this.clearTimeouts();
  }

  // private methods
  private clearTimeouts() {
    this.timeouts.forEach((timeoutId: any) => {
      clearTimeout(timeoutId);
    });

    this.timeouts = [];
  }

  private startTrackActivity() {
    this.trackActivity.state = TrackActivityState.started;

    this.io.emit(TrackActivitySocketEvent.STARTED, this.trackActivity);
    this.log('Event: ' + TrackActivitySocketEvent.STARTED);
    this.log(this.trackActivity.name);

    this.setTimeout(
      () => {
        this.simulateTimes();
      },
      1000
    );
  }

  private cautionTrackActivity() {
    this.trackActivity.state = TrackActivityState.caution;

    this.io.emit(TrackActivitySocketEvent.CAUTION, this.trackActivity);
    this.log('Event: ' + TrackActivitySocketEvent.CAUTION);
    this.log(this.trackActivity.name);

    this.setTimeout(
      () => {
        this.trackActivity.state = TrackActivityState.started;

        this.io.emit(TrackActivitySocketEvent.STARTED, this.trackActivity);
        this.log('Event: ' + TrackActivitySocketEvent.STARTED);
        this.log(this.trackActivity.name);
      },
      10000
    );
  }

  private stopTrackActivity() {
    this.trackActivity.state = TrackActivityState.stopped;

    this.io.emit(TrackActivitySocketEvent.STOPPED, this.trackActivity);
    this.log('Event: ' + TrackActivitySocketEvent.STOPPED);
    this.log(this.trackActivity.name);

    this.clearTimeouts();
  }

  private finishTrackActivity() {
    this.trackActivity.state = TrackActivityState.finished;

    this.io.emit(TrackActivitySocketEvent.FINISHED, this.trackActivity);
    this.log('Event: ' + TrackActivitySocketEvent.FINISHED);
    this.log(this.trackActivity.name);

    this.clearTimeouts();
  }

  private simulateTimes() {
    for (let participantIndex = 0; participantIndex < PARTICIPANTS; participantIndex++) {
      this.setTimeout(
        () => {
          this.startTimes(participantIndex);
        },
        lodash.random(0, TRACK_ACTIVITY_DELAY)
      );
    }
  }

  private startTimes(participantIndex: number) {
    const participant: RaceParticipant = this.participants[participantIndex];

    const data: RaceParticipantTrackActivity = {
      state: RaceParticipantTrackActivityState.on_pit,
      race_participant: participant,
      laps: [],
      laps_count: 0,
      best_lap: null,
      last_lap: null
    };

    this.simulateTrackActivity(data);
  }

  private simulateTrackActivity(data: RaceParticipantTrackActivity): void {
    // Pit -> Track
    if (data.state === RaceParticipantTrackActivityState.on_pit) {
      this.emitGoToTrack(data);
    } else {
      const canGoToPit = data.last_lap && data.last_lap.time;

      // Track -> Pit after 3 laps
      if (canGoToPit && data.laps_count > 0 && ((data.laps_count % 3) === 0)) {
        this.emitGoToPit(data);
      } else {
        // Partial lap
        this.emitPartialLapTime(data);
      }
    }
  }

  private emitGoToTrack(data: RaceParticipantTrackActivity): void {
    // Logic
    data.state = RaceParticipantTrackActivityState.on_track;

    // Add new lap
    const lap: TrackLap = {
      time: null,
      ref_lap: false,
      partials: []
    };
    
    data.laps.push(lap);
    data.last_lap = lap;
    
    // Set best lap
    if (!data.best_lap) {
      data.best_lap = lap;
    }

    this.io.emit(TimingSocketEvent.GO_TO_TRACK, data);
    this.log('Event: ' + TimingSocketEvent.GO_TO_TRACK);
    this.log(
      '-> #' + data.race_participant.number + ' - ' + data.race_participant.driver.name
    );

    this.simulateTrackActivity(data);
  }

  private emitGoToPit(data: RaceParticipantTrackActivity): void {

    // Logic
    data.state = RaceParticipantTrackActivityState.on_pit;

    this.io.emit(TimingSocketEvent.GO_TO_PIT, data);
    this.log('Event: ' + TimingSocketEvent.GO_TO_PIT);
    this.log(
      '-> #' + data.race_participant.number + ' - ' + data.race_participant.driver.name
    );

    this.simulateTrackActivity(data);
  }

  private emitPartialLapTime(data: RaceParticipantTrackActivity): void {
    let lastSector = data.last_lap.partials.length;
    let currentSector = lastSector + 1;
    const lapFinished = lastSector === TRACK_ACTIVITY_SECTORS;

    if (lapFinished) {
      // Add new lap
      const lap: TrackLap = {
        time: null,
        ref_lap: false,
        partials: []
      };
      
      data.laps.push(lap);
      data.last_lap = lap;

      currentSector = 1;
    }
    
    // Generate partial lap time
    let partialLapTime = REF_LAP_PARTIALS[currentSector > 0 ? currentSector - 1 : 0];
    // Add some error
    const min = LAP_PARTIALS_ESTIMATED_ERROR_MIN[currentSector > 0 ? currentSector - 1 : 0],
      max = LAP_PARTIALS_ESTIMATED_ERROR_MAX[currentSector > 0 ? currentSector - 1 : 0];
    partialLapTime += lodash.random(min, max);

    const partialLap: TrackPartialLap = {
      time: partialLapTime,
      sector: currentSector
    };
    data.last_lap.partials.push(partialLap);
    
    const lastPartial = currentSector === TRACK_ACTIVITY_SECTORS;

    this.setTimeout(
      () => {
        this.io.emit(TimingSocketEvent.PARTIAL_LAP_TIME, data);
        this.log('Event: ' + TimingSocketEvent.PARTIAL_LAP_TIME);
        this.log(
          '-> Sector: ' + partialLap.sector + ' | Time: ' + partialLap.time
        );

        if (lastPartial) {
          this.emitLapTime(data);
        }

        this.simulateTrackActivity(data);
      },
      partialLapTime
    );
  }

  private emitLapTime(data: RaceParticipantTrackActivity): void {
    // Logic
    data.laps_count++;
    data.last_lap.time = this.extractLapTime(data.last_lap.partials);
    data.best_lap = !data.best_lap.time || data.last_lap.time < data.best_lap.time ? data.last_lap : data.best_lap;

    this.io.emit(TimingSocketEvent.LAP_TIME, data);
    this.log('Event: ' + TimingSocketEvent.LAP_TIME);
    this.log(
      '-> Lap count: ' + data.laps_count + ' | Time: ' + data.last_lap.time
    );
  }

  // helpers
  private extractLapTime(partials: TrackPartialLap[]): number {
    let lapTime: number = 0;
  
    partials.forEach((partialLap: TrackPartialLap) => {
      lapTime += partialLap.time;
    });
  
    return lapTime;
  }

  private setTimeout(handler: (...args: any[]) => void, timeout: number) {
    let timeoutId = setTimeout(
      handler,
      timeout
    );
    this.timeouts.push(timeoutId);
  }

  private log(text: string) {
    if (!LOG) {
      return;
    }

    console.log(text);
  }
}