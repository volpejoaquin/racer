// angular
import { OnInit } from '@angular/core';

// libs
import { Store, select } from '@ngrx/store';

// actions
import * as fromRoot from '../../../core/reducers/';

// models
import {
  RaceParticipant
} from '../../../shared/model/';

export class BaseTimingComponent implements OnInit {
  // protected properties
  invisibleRaceParticipantNumbers: number[] = [];
  dimmedRaceParticipantNumbers: number[] = [];

  // public methods
  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getRaceParticipants)).subscribe((raceParticipants: any) => {
      this.invisibleRaceParticipantNumbers = raceParticipants.invisible;
      this.dimmedRaceParticipantNumbers = raceParticipants.dimmed;
    });
  }

  isRaceParticipantInvisible(raceParticipant: RaceParticipant) {
    return this.isRaceParticipantNumberInvisible(raceParticipant.number);
  }

  isRaceParticipantDimmed(raceParticipant: RaceParticipant) {
    return this.isRaceParticipantNumberDimmed(raceParticipant.number);
  }

  // protected methods

  protected isRaceParticipantNumberInvisible(raceParticipantNumber: number) {
    return this.invisibleRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  }

  protected isRaceParticipantNumberDimmed(raceParticipantNumber: number) {
    return this.dimmedRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  }
}
