// libs
import * as lodash from 'lodash';

// models
import {
  TrackActivity,
  TrackLap,
  TrackPartialLap,
  RaceParticipant,
  RaceParticipantTrackActivity,
  RaceParticipantTrackActivityState,
  TimingSocketEvent
} from '../model/';

// dummy data
import {
  TRACK_ACTIVITY,
  RACE_PARTICIPANTS
} from './dummy-data';

const TRACK_ACTIVITY_DELAY = 5000; // time to track
const TRACK_ACTIVITY_SECTORS = 4;
// const PARTIALS_TIMES = [9802, 23233, 31718, 20435]; // Real lap time
const PARTIALS_TIMES = [3000, 3000, 3000, 3000]; // Fast lap time
const PARTICIPANTS = 7; // <= 7
const LOG = false;

export class TimingDummy {
  private io: SocketIO.Server;
  private trackActivity: TrackActivity = TRACK_ACTIVITY;
  private participants: RaceParticipant[] = lodash.clone(RACE_PARTICIPANTS);
  private timeouts: any[] = [];

  constructor(io: SocketIO.Server) {
    this.io = io;
  }

  start() {
    for (let participantIndex = 0; participantIndex < PARTICIPANTS; participantIndex++) {
      setTimeout(
        () => {
          this.startTrackActivity(participantIndex);
        },
        lodash.random(0, TRACK_ACTIVITY_DELAY)
      );
    }
  }

  stop() {
    this.timeouts.forEach((timeoutId: any) => {
      clearTimeout(timeoutId);
    });

    this.timeouts = [];
  }

  // private methods
  private startTrackActivity(participantIndex: number) {
    const participant: RaceParticipant = this.participants[participantIndex];

    const data: RaceParticipantTrackActivity = {
      state: RaceParticipantTrackActivityState.on_pit,
      track_activity: this.trackActivity,
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
        partials: []
      };
      
      data.laps.push(lap);
      data.last_lap = lap;

      currentSector = 1;
    }
    
    // Generate partial lap time
    let partialLapTime = PARTIALS_TIMES[currentSector > 0 ? currentSector - 1 : 0];
    // Add some error
    partialLapTime += lodash.random(-500, 2000);

    const partialLap: TrackPartialLap = {
      time: partialLapTime,
      sector: currentSector
    };
    data.last_lap.partials.push(partialLap);
    
    const lastPartial = currentSector === TRACK_ACTIVITY_SECTORS;

    let timeoutId = setTimeout(
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

    this.timeouts.push(timeoutId);
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

  private log(text: string) {
    if (!LOG) {
      return;
    }

    console.log(text);
  }
}