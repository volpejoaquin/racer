// libs
import { Directive, Input, OnInit, OnChanges, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as lodash from 'lodash';

// actions
import * as fromUI from '../../core/reducers/ui.reducer';
import * as fromRoot from '../../core/reducers/';

// models
import { RaceParticipant } from '../model/';

@Directive({
  selector: '[racerRaceParticipant]'
})
export class RaceParticipantDirective implements OnInit, OnChanges {

  @Input('raceParticipant') raceParticipant: RaceParticipant;

  @HostBinding('class.race-participant') private baseClass = true;
  @HostBinding('class.race-participant_invisible') private isInvisible = false;
  @HostBinding('class.race-participant_dimmed') private isDimmed = false;

  private invisibleRaceParticipantNumbers: number[] = [];
  private dimmedRaceParticipantNumbers: number[] = [];
  private raceParticipantNumber: number;

  constructor(private store: Store<fromUI.State>) {
  }

  ngOnInit() {
    this.store.select(fromRoot.getInvisibleRaceParticipants).subscribe((invisibleRaceParticipants: number[]) => {
      this.invisibleRaceParticipantNumbers = invisibleRaceParticipants || [];

      this.checkVisibility();
    });

    this.store.select(fromRoot.getDimmedRaceParticipants).subscribe((dimmedRaceParticipants: number[]) => {
      this.dimmedRaceParticipantNumbers = dimmedRaceParticipants || [];

      this.checkVisibility();
    });
  }

  ngOnChanges() {
    if (this.raceParticipant) {
      this.raceParticipantNumber = lodash.toNumber(this.raceParticipant.number);

      this.checkVisibility();
    }
  }

  private checkVisibility() {
    this.isInvisible = this.invisibleRaceParticipantNumbers.indexOf(this.raceParticipantNumber) >= 0;
    this.isDimmed = this.dimmedRaceParticipantNumbers.indexOf(this.raceParticipantNumber) >= 0;
  }
}
