// libs
import * as lodash from 'lodash';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap,
  TrackActivity,
  TrackPartialLap
} from './../model';

export class TimingHelper {
  completeRaceParticipantTrackActivity(raceParticipantTrackActivity: RaceParticipantTrackActivity) {
    raceParticipantTrackActivity.last_lap = this.getLastLap(raceParticipantTrackActivity.laps);
    raceParticipantTrackActivity.laps_count = raceParticipantTrackActivity.laps.length;
    raceParticipantTrackActivity.best_lap = this.getBestLap(raceParticipantTrackActivity.laps);

    return raceParticipantTrackActivity;
  }

  getTrackActivityBestLap(trackActivity: TrackActivity): TrackLap {

    const laps: TrackLap[] = [];
    trackActivity.race_participants_track_activities.forEach((raceParticipantTrackActivity: RaceParticipantTrackActivity) => {
      if (raceParticipantTrackActivity.best_lap) {
        laps.push(raceParticipantTrackActivity.best_lap);
      }
    });

    return laps.length > 0 ? this.getBestLap(laps) : null;
  }

  getTrackLapGap(trackLap: TrackLap, refLap: TrackLap) {
    const lapTime = this.calculateLapTime(trackLap);
    const refLapTime = this.calculateLapTime(refLap, trackLap.partials.length);

    return lapTime - refLapTime;
  }

  private calculateLapTime(trackLap: TrackLap, partialsCount: number = -1) {
    const trackLapPartials = trackLap.partials,
      partials = partialsCount > 0 ? trackLapPartials.slice(0, partialsCount) : trackLapPartials;

    // Sum track lap partials
    let lapTime = 0;

    partials.forEach((partial: TrackPartialLap) => {
      lapTime += partial.time;
    });

    return lapTime;
  }

  private getLastLap(laps: TrackLap[]) {
    return lodash.last(laps);
  }

  private getBestLap(laps: TrackLap[]) {
    let bestLap: TrackLap = null;

    // find best lap
    let bestTime = Number.MAX_SAFE_INTEGER;
    laps.forEach((lap: TrackLap) => {
      // check if is not a partial lap and time is the best
      if (!lap.partial_lap && lap.time < bestTime) {
        bestLap = lap;
        bestTime = bestLap.time;
      }
    });

    return bestLap;
  }
}
