// libs
import * as lodash from 'lodash';

// models
import {
  TrackActivity,
  TrackLap,
  TrackPartialLap,
  RaceParticipant,
  RaceParticipantTrackActivity,
  RaceParticipantTrackActivityState
} from '../models/';

// dummy data
import {
  TRACK_ACTIVITY,
  RACE_PARTICIPANTS
} from './dummy-data';

const TRACK_ACTIVITY_DELAY = 3000; // time to track
const TRACK_ACTIVITY_SECTORS = 4;
// const PARTIALS_TIMES = [9802, 23233, 31718, 20435]; // Real lap time
const PARTIALS_TIMES = [1000, 1000, 1000, 1000]; // Fast lap time
const PARTICIPANTS = 6; // <= 6
// const PARTICIPANTS = 1;

export enum Event {
  go_to_track = 'go to track',
  go_to_pit = 'go to pit',
  partial_lap_time = 'partial lap time',
  lap_time = 'lap time'
}

export class TimingDummy {
  private io: SocketIO.Server;
  private trackActivity: TrackActivity = TRACK_ACTIVITY;
  private participants: RaceParticipant[] = lodash.clone(RACE_PARTICIPANTS);

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

    this.io.emit(Event.go_to_track, data);
    console.log('Event: ' + Event.go_to_track);
    console.log(
      '-> #' + data.race_participant.number + ' - ' + data.race_participant.driver.name
    );

    this.simulateTrackActivity(data);
  }

  private emitGoToPit(data: RaceParticipantTrackActivity): void {

    // Logic
    data.state = RaceParticipantTrackActivityState.on_pit;

    this.io.emit(Event.go_to_pit, data);
    console.log('Event: ' + Event.go_to_pit);
    console.log(
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

    setTimeout(
      () => {
        this.io.emit(Event.partial_lap_time, data);
        console.log('Event: ' + Event.partial_lap_time);
        console.log(
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

    this.io.emit(Event.lap_time, data);
    console.log('Event: ' + Event.lap_time);
    console.log(
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
}