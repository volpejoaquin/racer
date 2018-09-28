// libs
import { Action } from '@ngrx/store';

// models
import { RaceParticipantTrackActivity } from '../../shared/model';

export enum RaceParticipantTrackActivityActionTypes {
  LoadRaceParticipantTrackActivities = '[APP] Load Race Participant Track Activities'
}

export class LoadRaceParticipantTrackActivities implements Action {
  readonly type = RaceParticipantTrackActivityActionTypes.LoadRaceParticipantTrackActivities;

  constructor(public payload: RaceParticipantTrackActivity[]) {}
}

export type RaceParticipantTrackActivityActionsUnion = LoadRaceParticipantTrackActivities;
