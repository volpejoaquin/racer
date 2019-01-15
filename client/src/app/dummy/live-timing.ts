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
} from './../shared/model/';

const LOG = true;
const DISABLE_TRACK_STATE_CHANGES = true;

const TRACK_ACTIVITY_DELAY = 10000; // time to track
const LAP_PARTIALS_ESTIMATED_ERROR_MIN = [-200, -400, -500, -450];
const LAP_PARTIALS_ESTIMATED_ERROR_MAX = [200, 400, 500, 450];

export class LiveTiming {
  public static readonly TRACK_ACTIVITY_STARTED = 'track activity started';
  public static readonly TRACK_ACTIVITY_FINISHED = 'track activity finished';
  public static readonly GO_TO_TRACK = 'go to track';
  public static readonly GO_TO_PIT = 'go to pit';
  public static readonly PARTIAL_LAP_TIME = 'partial lap time';
  public static readonly LAP_TIME = 'lap time';

  private trackActivity: TrackActivity;
  private participants: RaceParticipant[] = [];
  private timeouts: any[] = [];
  private refLap: TrackLap;
  private refLapSectorsCount = 4;
  private maxLapsCount = 6;
  private speed = 1;
  private startedCount = 0;

  constructor(private output: any) {
  }

  start(rLap: TrackLap, rParticipants: RaceParticipant[], maxLapsCount: number, speed: number) {
    if (!rLap || !rParticipants || rParticipants.length === 0) {
      return;
    }

    this.refLap = rLap;
    this.refLapSectorsCount = rLap.partials.length;
    this.participants = rParticipants;
    this.maxLapsCount = maxLapsCount;
    this.speed = speed;
    this.simulateTimes();
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
    this.output(LiveTiming.TRACK_ACTIVITY_STARTED, null);
    this.log('Event: ' + LiveTiming.TRACK_ACTIVITY_STARTED);

    this.startedCount = this.participants.length;
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
    if (data.laps_count === this.maxLapsCount) {
      this.startedCount--;

      this.checkFinished();
      return;
    }

    // Pit -> Track
    if (data.state === RaceParticipantTrackActivityState.on_pit) {
      this.setTimeout(
        () => {
          // Add new lap
          const lap: TrackLap = {
            time: null,
            ref_lap: false,
            partial_lap: true,
            partials: []
          };
    
          data.laps.push(lap);
          data.last_lap = lap;

          if (!data.best_lap) {
            data.best_lap = lap;
          }

          this.emitGoToTrack(data);
        },
        lodash.random(0, TRACK_ACTIVITY_DELAY * 10)
      );
    } else {
      const canGoToPit = data.last_lap && data.last_lap.time;

      // Track -> Pit after 3 laps
      if (canGoToPit && data.laps_count > 0 && ((data.laps_count % 3) === 0)) {
        this.setTimeout(
          () => {
            this.emitGoToPit(data);
          },
          lodash.random(0, TRACK_ACTIVITY_DELAY)
        );
      } else {
        // Partial lap
        this.emitPartialLapTime(data);
      }
    }
  }

  private emitGoToTrack(data: RaceParticipantTrackActivity): void {
    // Logic
    data.state = RaceParticipantTrackActivityState.on_track;

    this.output(LiveTiming.GO_TO_TRACK, data);
    this.log('Event: ' + LiveTiming.GO_TO_TRACK);
    this.log(
      '-> #' + data.race_participant.number + ' - ' + data.race_participant.driver.name
    );

    this.simulateTrackActivity(data);
  }

  private emitGoToPit(data: RaceParticipantTrackActivity): void {

    // Logic
    data.state = RaceParticipantTrackActivityState.on_pit;

    this.output(LiveTiming.GO_TO_PIT, data);
    this.log('Event: ' + LiveTiming.GO_TO_PIT);
    this.log(
      '-> #' + data.race_participant.number + ' - ' + data.race_participant.driver.name
    );

    this.simulateTrackActivity(data);
  }

  private emitPartialLapTime(data: RaceParticipantTrackActivity): void {
    const lastLap: TrackLap = data.last_lap;
    const lastSector = lastLap ? lastLap.partials.length : 0;
    let currentSector = lastSector + 1;

    if (!lastLap || !lastLap.partial_lap) {
      currentSector = 1;
    }

    // Generate partial lap time
    let partialLapTime = this.refLap.partials[currentSector > 0 ? currentSector - 1 : 0].time;
    // Add some error
    const min = LAP_PARTIALS_ESTIMATED_ERROR_MIN[currentSector > 0 ? currentSector - 1 : 0],
      max = LAP_PARTIALS_ESTIMATED_ERROR_MAX[currentSector > 0 ? currentSector - 1 : 0];
    partialLapTime += lodash.random(min, max);

    this.setTimeout(
      () => {
        if (!lastLap || !lastLap.partial_lap) {
          // Add new lap
          const lap: TrackLap = {
            time: null,
            ref_lap: false,
            partial_lap: true,
            partials: []
          };
    
          data.laps.push(lap);
          data.last_lap = lap;
    
          if (!data.best_lap) {
            data.best_lap = lap;
          }
        }

        const partialLap: TrackPartialLap = {
          time: partialLapTime,
          sector: currentSector
        };
        data.last_lap.partials.push(partialLap);
    
        const lastPartial = currentSector === this.refLapSectorsCount;

        if (lastPartial) {
          this.emitLapTime(data);
        } else {
          this.output(LiveTiming.PARTIAL_LAP_TIME, data);
          this.log('Event: ' + LiveTiming.PARTIAL_LAP_TIME);
          this.log(
            '-> Sector: ' + partialLap.sector + ' | Time: ' + partialLap.time
          );
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
    data.last_lap.partial_lap = false;
    data.best_lap = !data.best_lap.time || data.last_lap.time < data.best_lap.time ? data.last_lap : data.best_lap;

    this.output(LiveTiming.LAP_TIME, data);
    this.log('Event: ' + LiveTiming.LAP_TIME);
    this.log(
      '-> Lap count: ' + data.laps_count + ' | Time: ' + data.last_lap.time
    );
  }

  private checkFinished() {
    if (this.startedCount === 0) {
      this.output(LiveTiming.TRACK_ACTIVITY_FINISHED, null);
      this.log('Event: ' + LiveTiming.TRACK_ACTIVITY_FINISHED);
    }
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
    const speed = Math.floor(timeout / this.speed);
    const timeoutId = setTimeout(
      handler,
      speed
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
