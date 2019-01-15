// angular
import { Component, OnInit, OnChanges, Input, HostListener } from '@angular/core';

// libs
import { Store } from '@ngrx/store';

// modules
import * as fromTiming from '../../../timing/reducers';
import { RaceWeekendActions } from '../../../timing/actions';

// models
import {
  RaceWeekend
} from '../../../shared/model';

// dummy data

@Component({
  selector: 'racer-race-weekends',
  templateUrl: './race-weekends.component.html',
  styleUrls: ['./race-weekends.component.scss']
})
export class RaceWeekendsComponent implements OnInit, OnChanges {
  @Input() raceWeekends: RaceWeekend[];
  selectedRaceWeekend: RaceWeekend;

  constructor(private store: Store<fromTiming.State>) {
  }

  ngOnInit() {
    this.store.select(fromTiming.getSelectedRaceWeekend).subscribe((rWeekend: RaceWeekend) => {
      this.selectedRaceWeekend = rWeekend;
    });
  }

  ngOnChanges() {
    // TODO: Scroll to selectedRaceWeekend
  }

  onSelectRaceWeekend(raceWeekend: RaceWeekend) {
    this.selectRaceWeekend(raceWeekend.id);
  }

  isSelectedRaceWeekend(raceWeekend: RaceWeekend) {
    return this.selectedRaceWeekend && this.selectedRaceWeekend.id === raceWeekend.id;
  }

  private selectRaceWeekend(raceWeekendId: string) {
    this.store.dispatch(new RaceWeekendActions.SelectRaceWeekend(raceWeekendId));
  }
}
