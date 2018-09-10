// models
import {
  CarCategory,
  CarDivision,
  Circuit,
  CircuitVariant,
  Championship,
  RaceWeekend,
  TrackActivity,
  TrackActivityState,
  TrackLap,
  RaceParticipant
} from '../model/';

export const CAR_CATEGORY: CarCategory = {
  name: 'Formula 1',
  short_name: 'F1'
};

export const CAR_DIVISION: CarDivision = {
  name: 'Formula 1',
  short_name: 'F1',
  car_category: CAR_CATEGORY
};

export const CHAMPIONSHIP: Championship = {
  year: 2018,
  car_division: CAR_DIVISION
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


export const RACE_WEEKEND: RaceWeekend = {
  name: 'ITALY GP',
  championship: CHAMPIONSHIP,
  circuit_variant: CIRCUIT_VARIANT,
  track_activities: [
    {
      name: 'Practice 1',
      short_name: 'P1',
      date: '2018-10-12T14:00:00Z',
      duration: 12000000,
      state: TrackActivityState.waiting
    }
  ]
};

export const TRACK_ACTIVITY: TrackActivity = RACE_WEEKEND.track_activities[0];

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
    number: 44,
    championship: CHAMPIONSHIP
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
    number: 5,
    championship: CHAMPIONSHIP
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
    number: 3,
    championship: CHAMPIONSHIP
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
    number: 7,
    championship: CHAMPIONSHIP
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
    number: 77,
    championship: CHAMPIONSHIP
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
    number: 33,
    championship: CHAMPIONSHIP
  }
];

export const REF_LAP_PARTIALS = [9802, 23233, 31718, 20435]; // Real lap time
// export const REF_LAP_PARTIALS = [2000, 3000, 4000, 5000]; // Fast lap time
export const LAP_PARTIALS_ESTIMATED_ERROR_MIN = -500;
export const LAP_PARTIALS_ESTIMATED_ERROR_MAX = 1000;
export const REF_LAP: TrackLap = {
  time: REF_LAP_PARTIALS[0] + REF_LAP_PARTIALS[1] + REF_LAP_PARTIALS[2] + REF_LAP_PARTIALS[3],
  ref_lap: true,
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

export const TRACK_ACTIVITY_DELAY = 5000; // time to track
export const TRACK_ACTIVITY_SECTORS = REF_LAP_PARTIALS.length;
