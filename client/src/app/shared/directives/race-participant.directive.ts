// libs
import { Directive, Input, OnChanges, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromUI from '../../core/reducers/ui.reducer';
import * as fromRoot from '../../core/reducers/';

// models
import { RaceParticipant } from '../model/';

@Directive({
  selector: '[racerRaceParticipant]'
})
export class RaceParticipantDirective implements OnChanges {

  @Input('raceParticipant') raceParticipant: RaceParticipant;

  @HostBinding('class.race-participant') private baseClass = true;
  @HostBinding('class.race-participant_invisible') private isInvisible = false;
  @HostBinding('class.race-participant_dimmed') private isDimmed = false;

  private raceParticipantNumber: number;

  constructor(store: Store<fromUI.State>) {
    store.pipe(select(fromRoot.getInvisibleRaceParticipants)).subscribe((invisibleRaceParticipants: number[]) => {
      this.isInvisible = invisibleRaceParticipants.indexOf(this.raceParticipantNumber) >= 0;
    });

    store.pipe(select(fromRoot.getDimmedRaceParticipants)).subscribe((dimmedRaceParticipants: number[]) => {
      this.isDimmed = dimmedRaceParticipants.indexOf(this.raceParticipantNumber) >= 0;
    });
  }

  ngOnChanges() {
    if (this.raceParticipant) {

      if (this.raceParticipant.number !== 80) {
        // this.hide();
        // this.dim();
      }
    }
  }

  private checkCurrentVisibility() {

  }

  private hide() {
    this.isInvisible = true;
  }

  private dim() {
    this.isDimmed = true;
  }

  private show() {
    this.isInvisible = false;
    this.isDimmed = false;
  }
}
