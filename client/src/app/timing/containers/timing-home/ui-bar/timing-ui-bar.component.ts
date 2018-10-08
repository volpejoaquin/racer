// angular
import { Component, OnInit, Input } from '@angular/core';

// libs
import { Store, select } from '@ngrx/store';

// models
import {
  RaceParticipant
} from '../../../../shared/model';

// actions
import * as fromRoot from '../../../../core/reducers/';
import * as fromUI from '../../../../core/reducers/ui.reducer';

export const MAX_UI_MODES_COUNT = 3;

@Component({
  selector: 'racer-timing-ui-bar',
  templateUrl: './timing-ui-bar.component.html',
  styleUrls: ['./timing-ui-bar.component.scss']
})
export class TimingUiBarComponent implements OnInit {
  @Input() raceParticipants: RaceParticipant[];
  invisibleRaceParticipantNumbers: number[] = [];
  dimmedRaceParticipantNumbers: number[] = [];
  markedRaceParticipantNumbers: number[] = [];

  currentMode = 0;
  searchText = '';

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getRaceParticipants)).subscribe((raceParticipants: fromUI.RaceParticipantsState) => {
      this.invisibleRaceParticipantNumbers = raceParticipants.invisible;
      this.dimmedRaceParticipantNumbers = raceParticipants.dimmed;
      this.markedRaceParticipantNumbers = raceParticipants.marked;

      this.searchText = '';
    });
  }

  nextUIMode() {
    const nextMode = (this.currentMode + 1) % (MAX_UI_MODES_COUNT - 1); // TODO: REVIEW THIS

    this.onChangeMode(nextMode);
  }

  onChangeMode(mode: number) {
    this.currentMode = mode;
  }
}
