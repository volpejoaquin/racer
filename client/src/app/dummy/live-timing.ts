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
  TrackActivitySocketEvent,
  TimingSocketEvent,
  TrackActivityState
} from './../shared/model/';

const LOG = true;
const DISABLE_TRACK_STATE_CHANGES = true;

const TRACK_ACTIVITY_DELAY = 5000; // time to track
const LAP_PARTIALS_ESTIMATED_ERROR_MIN = [-200, -400, -500, -450];
const LAP_PARTIALS_ESTIMATED_ERROR_MAX = [200, 400, 500, 450];

export class LiveTiming {
  private trackActivity: TrackActivity;
  private participants: RaceParticipant[] = [];
  private timeouts: any[] = [];
  private refLap: TrackLap;
  private refLapSectorsCount = 4;

  constructor(private output: any) {
  }

  start(rLap: TrackLap, rParticipants: RaceParticipant[]) {
    if (!rLap || !rParticipants || rParticipants.length === 0) {
      return;
    }

    this.refLap = rLap;
    this.refLapSectorsCount = rLap.partials.length;
    this.participants = rParticipants;
    this.setTimeout(
      () => {
        this.simulateTimes();
      },
      1000
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

  private simulateTimes() {
    for (let participantIndex = 0; participantIndex < this.participants.length; participantIndex++) {
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
      id: participant.number.toString(),
      state: RaceParticipantTrackActivityState.on_pit,
      race_participant: participant,
      laps: [],
      laps_count: 0,
      best_lap: null,
      best_lap_index: 0,
      last_lap: null,
      total_time: 0
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
      partial_lap: true,
      partials: []
    };

    data.laps.push(lap);
    data.last_lap = lap;

    // Set best lap
    if (!data.best_lap) {
      data.best_lap = lap;
    }

    this.output(TimingSocketEvent.GO_TO_TRACK, data);
    this.log('Event: ' + TimingSocketEvent.GO_TO_TRACK);
    this.log(
      '-> #' + data.race_participant.number + ' - ' + data.race_participant.driver.name
    );

    this.simulateTrackActivity(data);
  }

  private emitGoToPit(data: RaceParticipantTrackActivity): void {

    // Logic
    data.state = RaceParticipantTrackActivityState.on_pit;

    this.output(TimingSocketEvent.GO_TO_PIT, data);
    this.log('Event: ' + TimingSocketEvent.GO_TO_PIT);
    this.log(
      '-> #' + data.race_participant.number + ' - ' + data.race_participant.driver.name
    );

    this.simulateTrackActivity(data);
  }

  private emitPartialLapTime(data: RaceParticipantTrackActivity): void {
    const lastSector = data.last_lap.partials.length;
    let currentSector = lastSector + 1;
    const lapFinished = lastSector === this.refLapSectorsCount;

    if (lapFinished) {
      // Add new lap
      const lap: TrackLap = {
        time: null,
        ref_lap: false,
        partial_lap: true,
        partials: []
      };

      data.laps.push(lap);
      data.last_lap = lap;

      currentSector = 1;
    }

    // Generate partial lap time
    let partialLapTime = this.refLap.partials[currentSector > 0 ? currentSector - 1 : 0].time;
    // Add some error
    const min = LAP_PARTIALS_ESTIMATED_ERROR_MIN[currentSector > 0 ? currentSector - 1 : 0],
      max = LAP_PARTIALS_ESTIMATED_ERROR_MAX[currentSector > 0 ? currentSector - 1 : 0];
    partialLapTime += lodash.random(min, max);

    const partialLap: TrackPartialLap = {
      time: partialLapTime,
      sector: currentSector
    };
    data.last_lap.partials.push(partialLap);

    const lastPartial = currentSector === this.refLapSectorsCount;

    this.setTimeout(
      () => {
        this.output(TimingSocketEvent.PARTIAL_LAP_TIME, data);
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

    this.output(TimingSocketEvent.LAP_TIME, data);
    this.log('Event: ' + TimingSocketEvent.LAP_TIME);
    this.log(
      '-> Lap count: ' + data.laps_count + ' | Time: ' + data.last_lap.time
    );
  }

  // helpers
  private extractLapTime(partials: TrackPartialLap[]): number {
    let lapTime = 0;

    partials.forEach((partialLap: TrackPartialLap) => {
      lapTime += partialLap.time;
    });

    return lapTime;
  }

  private setTimeout(handler: (...args: any[]) => void, timeout: number) {
    const timeoutId = setTimeout(
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
