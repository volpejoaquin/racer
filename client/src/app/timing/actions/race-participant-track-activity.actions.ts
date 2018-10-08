// libs
import { Action } from '@ngrx/store';

// models
import { RaceParticipantTrackActivity } from '../../shared/model';

export enum RaceParticipantTrackActivityActionTypes {
  ImportRaceParticipantTrackActivities = '[APP] Import Race Participant Track Activities',
  LoadRaceParticipantTrackActivities = '[APP] Load Race Participant Track Activities',
  SetBestRaceParticipantTrackActivity = '[APP] Set Best Race Participant Track Activity'
}

export class ImportRaceParticipantTrackActivities implements Action {
  readonly type = RaceParticipantTrackActivityActionTypes.ImportRaceParticipantTrackActivities;

  constructor(public payload: RaceParticipantTrackActivity[]) {}
}

export class LoadRaceParticipantTrackActivities implements Action {
  readonly type = RaceParticipantTrackActivityActionTypes.LoadRaceParticipantTrackActivities;

  constructor(public payload: RaceParticipantTrackActivity[]) {}
}

export class SetBestRaceParticipantTrackActivity implements Action {
  readonly type = RaceParticipantTrackActivityActionTypes.SetBestRaceParticipantTrackActivity;

  constructor(public payload: string) {}
}

export type RaceParticipantTrackActivityActionsUnion =
  ImportRaceParticipantTrackActivities |
  LoadRaceParticipantTrackActivities |
  SetBestRaceParticipantTrackActivity;

