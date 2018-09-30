// angular
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as lodash from 'lodash';

// libs
import { Store } from '@ngrx/store';

// modules
import {
  ShowRaceParticipant,
  HideRaceParticipant,
  DimRaceParticipant
} from './../../../core/actions/ui.actions';
import * as fromUI from '../../../core/reducers';

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

  currentMode = 0;

  private invisibleRaceParticipantNumbers: number[] = [];
  private dimmedRaceParticipantNumbers: number[] = [];

  constructor(private store: Store<fromUI.State>) {
  }

  ngOnInit() {
    this.store.select(fromUI.getInvisibleRaceParticipants).subscribe((invisibleRaceParticipants: number[]) => {
      this.invisibleRaceParticipantNumbers = invisibleRaceParticipants || [];
    });

    this.store.select(fromUI.getDimmedRaceParticipants).subscribe((dimmedRaceParticipants: number[]) => {
      this.dimmedRaceParticipantNumbers = dimmedRaceParticipants || [];
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

  private changeRaceParticipantVisibility(raceParticipantNumber: number) {
    if (this.invisibleRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0) {
      this.showRaceParticipant(raceParticipantNumber);
    } else if (this.dimmedRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0) {
      this.hideRaceParticipant(raceParticipantNumber);
    } else {
      this.dimRaceParticipant(raceParticipantNumber);
    }
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
