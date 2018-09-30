// models
import {
  CarCategory,
  CarDivision,
  Circuit,
  CircuitVariant,
  RaceWeekend,
  TrackActivity,
  TrackActivityState,
  TrackLap,
  RaceParticipant,
  RaceParticipantTrackActivityState,
  RaceParticipantTrackActivity,
  TrackActivityType
} from '../model/';

export const CAR_CATEGORY: CarCategory = {
  name: 'TURISMO PISTA',
  short_name: 'TP'
};

export const CAR_DIVISION: CarDivision = {
  name: 'CLASE X',
  short_name: 'CX',
  car_category: CAR_CATEGORY
};

export const CIRCUIT: Circuit = {
  name: 'Autodromo Nazionale di Monza',
  city: {
    name: 'Italia',
    country: 'Argentina'
  }
};

export const CIRCUIT_VARIANT: CircuitVariant = {
  name: 'Circuit N° 1',
  length: 5793,
  circuit: CIRCUIT
};

const trackActivityDuration = 300000, // 12000000
  trackActivityDate = new Date();
trackActivityDate.setMinutes(0);

export const TRACK_ACTIVITY: TrackActivity = {
  name: 'Practice 1',
  short_name: 'P1',
  date: trackActivityDate.toISOString(),
  laps: 0,
  duration: trackActivityDuration,
  state: TrackActivityState.waiting,
  type: TrackActivityType.practice,
  race_participants_track_activities: []
};

export const RACE_WEEKEND: RaceWeekend = {
  name: 'ITALY GP',
  start_date: '',
  end_date: '',
  track_activities: [
    TRACK_ACTIVITY
  ]
};


export const RACE_PARTICIPANTS: RaceParticipant[] = [
  {
    team: {
      name: 'TEAM'
    },
    car: {
      name: 'CAR NAME'
    },
    driver: {
      name: 'LEWIS',
      last_name: 'HAMILTON'
    },
    number: 44
  },
  {
    team: {
      name: 'TEAM'
    },
    car: {
      name: 'CAR NAME'
    },
    driver: {
      name: 'SEBASTIAL',
      last_name: 'VETTEL'
    },
    number: 5
  },
  {
    team: {
      name: 'TEAM'
    },
    car: {
      name: 'CAR NAME'
    },
    driver: {
      name: 'DANIEL',
      last_name: 'RICCIARDO'
    },
    number: 3
  },
  {
    team: {
      name: 'TEAM'
    },
    car: {
      name: 'CAR NAME'
    },
    driver: {
      name: 'RAIKKONEN',
      last_name: 'KIMI'
    },
    number: 7
  },
  {
    team: {
      name: 'TEAM'
    },
    car: {
      name: 'CAR NAME'
    },
    driver: {
      name: 'BOTTAS',
      last_name: 'VALTTERI'
    },
    number: 77
  },
  {
    team: {
      name: 'TEAM'
    },
    car: {
      name: 'CAR NAME'
    },
    driver: {
      name: 'VERSTAPEN',
      last_name: 'MAX'
    },
    number: 33
  }
];

// export const REF_LAP_PARTIALS = [9802, 23233, 31718, 20435]; // Real lap time
export const REF_LAP_PARTIALS = [2000, 3000, 4000, 5000]; // Fast lap time
export const LAP_PARTIALS_ESTIMATED_ERROR_MIN = [-200, -400, -500, -450];
export const LAP_PARTIALS_ESTIMATED_ERROR_MAX = [200, 400, 500, 450];
export const REF_LAP: TrackLap = {
  time: REF_LAP_PARTIALS[0] + REF_LAP_PARTIALS[1] + REF_LAP_PARTIALS[2] + REF_LAP_PARTIALS[3],
  ref_lap: true,
  partial_lap: false,
  partials: [
    {
      time: REF_LAP_PARTIALS[0],
      sector: 1
    },
    {
      time: REF_LAP_PARTIALS[1],
      sector: 2
    },
    {
      time: REF_LAP_PARTIALS[2],
      sector: 3
    },
    {
      time: REF_LAP_PARTIALS[3],
      sector: 4
    }
  ]
}
export const PARTICIPANTS = 6; // <= 6
// export const PARTICIPANTS = 2; // <= 6

export const TRACK_ACTIVITY_DELAY = 5000; // time to track
export const TRACK_ACTIVITY_SECTORS = REF_LAP_PARTIALS.length;

export const EMPTY_RACE_PARTICIPANT_TRACK_ACTIVITY: RaceParticipantTrackActivity = {
  state: RaceParticipantTrackActivityState.on_pit,
  race_participant: null,
  laps: [],
  laps_count: 0,
  best_lap: null,
  last_lap: null,
  total_time: 0
};
