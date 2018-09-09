// models
import {
  CarCategory,
  CarDivision,
  Circuit,
  CircuitVariant,
  Championship,
  RaceWeekend,
  TrackActivity,
  RaceParticipant
} from '../models/';

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
      name: 'Practice N1',
      short_name: 'P1',
      date: '2018-10-12T14:00:00Z',
      duration: 12000000
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
  }
];
