// angular
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as lodash from 'lodash';

// libs
import { Store, select } from '@ngrx/store';

// modules
import {
  ShowRaceParticipant,
  HideRaceParticipant,
  DimRaceParticipant
} from './../../../core/actions/ui.actions';
import * as fromRoot from '../../../core/reducers/';

// models
import {
  RaceParticipant
} from '../../../shared/model/';

@Component({
  selector: 'racer-race-participants-visibility',
  templateUrl: './race-participants-visibility.component.html',
  styleUrls: ['./race-participants-visibility.component.scss']
})
export class RaceParticipantsVisibilityComponent implements OnInit, OnChanges {
  @Input() raceParticipants: RaceParticipant[];
  teamRaceParticipantNumbers: number[] = [80];
  invisibleRaceParticipantNumbers: number[] = [];
  dimmedRaceParticipantNumbers: number[] = [];

  currentMode = 0;
  searchText = '';


  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getRaceParticipants)).subscribe((raceParticipants: any) => {
      console.log('raceParticipants', raceParticipants);
      this.invisibleRaceParticipantNumbers = raceParticipants.invisible;
      this.dimmedRaceParticipantNumbers = raceParticipants.dimmed;

    });
  }

  ngOnChanges() {
  }

  onChangeMode(mode: number) {
    this.currentMode = mode;

    this.raceParticipants.forEach((raceParticipant: RaceParticipant) => {
      const raceParticipantNumber = lodash.toNumber(raceParticipant.number);

      if (this.currentMode === 1) {
        this.changeRaceParticipantVisibility(raceParticipantNumber);
      } else if (this.currentMode === 2) {
        if (this.teamRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0) {
          this.showRaceParticipant(raceParticipantNumber);
        } else {
          this.changeRaceParticipantVisibility(raceParticipantNumber);
        }
      }
    });
  }

  onRaceParticipantClick(raceParticipant: RaceParticipant) {
    this.currentMode = 2;

    const raceParticipantNumber = lodash.toNumber(raceParticipant.number);

    this.changeRaceParticipantVisibility(raceParticipantNumber);
  }

  isRaceParticipantInvisible(raceParticipant: RaceParticipant) {
    return this.isRaceParticipantNumberInvisible(raceParticipant.number);
  }

  isRaceParticipantDimmed(raceParticipant: RaceParticipant) {
    return this.isRaceParticipantNumberDimmed(raceParticipant.number);
  }

  private changeRaceParticipantVisibility(raceParticipantNumber: number) {
    if (this.isRaceParticipantNumberInvisible(raceParticipantNumber)) {
      this.showRaceParticipant(raceParticipantNumber);
    } else if (this.isRaceParticipantNumberDimmed(raceParticipantNumber)) {
      this.hideRaceParticipant(raceParticipantNumber);
    } else {
      this.dimRaceParticipant(raceParticipantNumber);
    }
  }

  private isRaceParticipantNumberInvisible(raceParticipantNumber: number) {
    return this.invisibleRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  }

  private isRaceParticipantNumberDimmed(raceParticipantNumber: number) {
    return this.dimmedRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  }

  private showRaceParticipant(raceParticipantNumber: number) {
    this.store.dispatch(new ShowRaceParticipant(raceParticipantNumber));
  }

  private hideRaceParticipant(raceParticipantNumber: number) {
    this.store.dispatch(new HideRaceParticipant(raceParticipantNumber));
  }

  private dimRaceParticipant(raceParticipantNumber: number) {
    this.store.dispatch(new DimRaceParticipant(raceParticipantNumber));
  }
}
