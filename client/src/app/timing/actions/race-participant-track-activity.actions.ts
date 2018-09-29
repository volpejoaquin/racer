// libs
import { Action } from '@ngrx/store';

// models
import { RaceParticipantTrackActivity } from '../../shared/model';

export enum RaceParticipantTrackActivityActionTypes {
  LoadRaceParticipantTrackActivities = '[APP] Load Race Participant Track Activities',
  SetBestRaceParticipantTrackActivity = '[APP] Set Best Race Participant Track Activity'
}

export class LoadRaceParticipantTrackActivities implements Action {
  readonly type = RaceParticipantTrackActivityActionTypes.LoadRaceParticipantTrackActivities;

  constructor(public payload: RaceParticipantTrackActivity[]) {}
}

export class SetBestRaceParticipantTrackActivity implements Action {
  readonly type = RaceParticipantTrackActivityActionTypes.SetBestRaceParticipantTrackActivity;

  constructor(public payload: number) {}
}

export type RaceParticipantTrackActivityActionsUnion = LoadRaceParticipantTrackActivities | SetBestRaceParticipantTrackActivity;
