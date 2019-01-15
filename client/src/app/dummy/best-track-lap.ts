import { TrackLap } from "../shared/model";

export const REAL_TRACK_LAP: TrackLap = {
  ref_lap: false,
  partial_lap: false,
  partials: [
    {
      time: 8671,
      sector: 0
    },
    {
      time: 25688,
      sector: 1
    },
    {
      time: 37725,
      sector: 2
    },
    {
      time: 13622,
      sector: 3
    }
  ],
  time: 105706
};

export const BEST_TRACK_LAP: TrackLap = REAL_TRACK_LAP;
