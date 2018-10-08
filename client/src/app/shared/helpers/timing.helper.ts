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
  mixRaceParticipantsTrackActivities(
    trackActivity: TrackActivity,
    newRaceParticipantTrackActivities: RaceParticipantTrackActivity[]): RaceParticipantTrackActivity[] {
    const response: RaceParticipantTrackActivity[] = trackActivity.race_participants_track_activities;
    let raceParticipantTrackActivity: RaceParticipantTrackActivity;

    newRaceParticipantTrackActivities.forEach((newRaceParticipantTrackActivity: RaceParticipantTrackActivity) => {
      raceParticipantTrackActivity = lodash.find(response, (rPTrackActivity: RaceParticipantTrackActivity) => {
        return rPTrackActivity.race_participant.number === newRaceParticipantTrackActivity.race_participant.number;
      });

      if (raceParticipantTrackActivity) {
        raceParticipantTrackActivity.laps = raceParticipantTrackActivity.laps.concat(newRaceParticipantTrackActivity.laps);

        raceParticipantTrackActivity = this.completeRaceParticipantTrackActivity(raceParticipantTrackActivity);
      } else {
        response.push(newRaceParticipantTrackActivity);
      }
    });
    return response;
  }

  filterRaceParticipantTrackActivities(
    trackActivity: TrackActivity,
    raceParticipantTrackActivities: RaceParticipantTrackActivity[]): RaceParticipantTrackActivity[] {
    let response: RaceParticipantTrackActivity[] = [];

      if (trackActivity.enabled_race_participant_numbers) {
        let raceParticipantNumber: number;

        raceParticipantTrackActivities.forEach((raceParticipantTrackActivity: RaceParticipantTrackActivity) => {
          raceParticipantNumber = raceParticipantTrackActivity.race_participant ? raceParticipantTrackActivity.race_participant.number : 0;

          if (trackActivity.enabled_race_participant_numbers.indexOf(raceParticipantNumber) >= 0) {
            response.push(raceParticipantTrackActivity);
          }
        });
      } else if (raceParticipantTrackActivities) {
        response = raceParticipantTrackActivities;
      }
    return response;
  }

  getBestRaceParticipantTrackActivity(raceParticipantTrackActivities: RaceParticipantTrackActivity[]): RaceParticipantTrackActivity | null {
    let bestRaceParticipantTrackActivity: RaceParticipantTrackActivity = null;

    if (!raceParticipantTrackActivities || raceParticipantTrackActivities.length === 0) {
      return bestRaceParticipantTrackActivity;
    }

    let bestTime = Number.MAX_SAFE_INTEGER;
    raceParticipantTrackActivities.forEach((rPTActivity: RaceParticipantTrackActivity) => {
      // check if is not a partial lap and time is the best
      if (rPTActivity.best_lap && !rPTActivity.best_lap.partial_lap && rPTActivity.best_lap.time < bestTime) {
        bestRaceParticipantTrackActivity = rPTActivity;
        bestTime = bestRaceParticipantTrackActivity.best_lap.time;
      }
    });

    return bestRaceParticipantTrackActivity;
  }

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
