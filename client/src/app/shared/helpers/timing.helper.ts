// libs
import * as lodash from 'lodash';

// models
import {
  RaceParticipantTrackActivity,
  TrackLap,
  TrackActivity
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

  getTrackLapGap(trackLap: TrackLap, bestLap: TrackLap) {
    const lapTime = trackLap.time;
    const isPartialLap = !lapTime;
    const partialCount = isPartialLap ? 0 : trackLap.partials.length;
    let bestLapTime = bestLap.time;

    // Sum partials
    if (!bestLapTime || isPartialLap) { // TODO: Review is partial lap diff
      bestLapTime = 0;

      let partial;
      for (let index = 0; index < partialCount; index++) {
        partial = bestLap.partials[index];

        if (partial) {
          bestLapTime += partial.time;
        }
      }
    }
    return lapTime - bestLapTime;
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
