// angular
import { OnInit } from '@angular/core';

// libs
import { Store, select } from '@ngrx/store';

// actions
import * as fromRoot from '../../../core/reducers/';
import * as fromUI from '../../../core/reducers/ui.reducer';

// models
import {
  RaceParticipant
} from '../../../shared/model/';

export class BaseTimingComponent implements OnInit {
  // protected properties
  invisibleRaceParticipantNumbers: number[] = [];
  dimmedRaceParticipantNumbers: number[] = [];
  markedRaceParticipantNumbers: number[] = [];

  // public methods
  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getRaceParticipants)).subscribe((raceParticipants: fromUI.RaceParticipantsState) => {
      this.invisibleRaceParticipantNumbers = raceParticipants.invisible;
      this.dimmedRaceParticipantNumbers = raceParticipants.dimmed;
      this.markedRaceParticipantNumbers = raceParticipants.marked;
    });
  }

  isRaceParticipantInvisible(raceParticipant: RaceParticipant) {
    return this.isRaceParticipantNumberInvisible(raceParticipant.number);
  }

  isRaceParticipantDimmed(raceParticipant: RaceParticipant) {
    return this.isRaceParticipantNumberDimmed(raceParticipant.number);
  }

  isRaceParticipantMarked(raceParticipant: RaceParticipant) {
    return this.isRaceParticipantNumberMarked(raceParticipant.number);
  }

  // protected methods

  protected isRaceParticipantNumberInvisible(raceParticipantNumber: number) {
    return this.invisibleRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  }

  protected isRaceParticipantNumberDimmed(raceParticipantNumber: number) {
    return this.dimmedRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  }

  protected isRaceParticipantNumberMarked(raceParticipantNumber: number) {
    return this.markedRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  }
}
