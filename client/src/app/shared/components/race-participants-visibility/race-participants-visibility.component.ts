// angular
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as lodash from 'lodash';

// modules
import {
  ShowRaceParticipant,
  HideRaceParticipant,
  DimRaceParticipant,
  MarkRaceParticipant
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
  @Input() currentMode = 0;
  @Input() invisibleRaceParticipantNumbers: number[] = [];
  @Input() dimmedRaceParticipantNumbers: number[] = [];
  @Input() markedRaceParticipantNumbers: number[] = [];
  @Input() searchText = '';
  teamRaceParticipantNumbers: number[] = [80]; // TODO: REVIEW THIS


  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges && simpleChanges.currentMode && !simpleChanges.currentMode.firstChange) {
      setTimeout(() => {
        const modeChanged = simpleChanges.currentMode.previousValue !== simpleChanges.currentMode.currentValue;
        this.checkState(modeChanged);
      }, 100); // TODO: REVIEW THIS
    }
  }

  onChangeMode(mode: number) {
    const modeChanged = this.currentMode !== mode;
    this.currentMode = mode;
    this.checkState(modeChanged);
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

  isRaceParticipantMarked(raceParticipant: RaceParticipant) {
    return this.isRaceParticipantNumberMarked(raceParticipant.number);
  }

  private changeRaceParticipantVisibility(raceParticipantNumber: number) {
    if (this.isRaceParticipantNumberInvisible(raceParticipantNumber)) {
      this.showRaceParticipant(raceParticipantNumber);
    } else if (this.isRaceParticipantNumberDimmed(raceParticipantNumber)) {
      this.hideRaceParticipant(raceParticipantNumber);
    } else if (this.isRaceParticipantNumberMarked(raceParticipantNumber)) {
      this.dimRaceParticipant(raceParticipantNumber);
    } else {
      this.markRaceParticipant(raceParticipantNumber);
    }
  }

  private isRaceParticipantNumberInvisible(raceParticipantNumber: number) {
    return this.invisibleRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  }

  private isRaceParticipantNumberDimmed(raceParticipantNumber: number) {
    return this.dimmedRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  }

  private isRaceParticipantNumberMarked(raceParticipantNumber: number) {
    return this.markedRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
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

  private markRaceParticipant(raceParticipantNumber: number) {
    this.store.dispatch(new MarkRaceParticipant(raceParticipantNumber));
  }

  private checkState(modeChanged = true) {
    this.raceParticipants.forEach((raceParticipant: RaceParticipant) => {
      const raceParticipantNumber = lodash.toNumber(raceParticipant.number);

      if (this.currentMode === 0) {
        this.showRaceParticipant(raceParticipantNumber);
      } else if (this.currentMode === 1) {
        if (this.teamRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0) {
          this.markRaceParticipant(raceParticipantNumber);
        } else {
          this.hideRaceParticipant(raceParticipantNumber);
        }
      } else if (this.currentMode === 2 && !modeChanged) {
        this.changeRaceParticipantVisibility(raceParticipantNumber);
      }
    });
  }
}
