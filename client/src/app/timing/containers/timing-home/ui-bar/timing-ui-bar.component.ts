// angular
import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import * as lodash from 'lodash';

// libs
import { Store, select } from '@ngrx/store';

// models
import {
  RaceParticipant,
  CarBrand
} from '../../../../shared/model';

// actions
import {
  ShowRaceParticipant,
  HideRaceParticipant,
  DimRaceParticipant,
  MarkRaceParticipant
} from './../../../../core/actions/ui.actions';
import * as fromRoot from '../../../../core/reducers/';
import * as fromUI from '../../../../core/reducers/ui.reducer';

export const MAX_UI_MODES_COUNT = 3;

@Component({
  selector: 'racer-timing-ui-bar',
  templateUrl: './timing-ui-bar.component.html',
  styleUrls: ['./timing-ui-bar.component.scss']
})
export class TimingUiBarComponent implements OnInit, OnChanges {
  @Input() raceParticipants: RaceParticipant[];
  carBrands: CarBrand[];
  invisibleRaceParticipantNumbers: number[] = [];
  dimmedRaceParticipantNumbers: number[] = [];
  markedRaceParticipantNumbers: number[] = [];

  currentMode = 0;
  searchText = '';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;
    switch (keyCode) {
      case 77:
        this.nextUIMode();
        break;
    }
  }

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    const getRaceParticipants$ = this.store.pipe(select(fromRoot.getRaceParticipants));
    getRaceParticipants$.subscribe((raceParticipants: fromUI.RaceParticipantsState) => {
      this.invisibleRaceParticipantNumbers = raceParticipants.invisible;
      this.dimmedRaceParticipantNumbers = raceParticipants.dimmed;
      this.markedRaceParticipantNumbers = raceParticipants.marked;
    });
  }

  ngOnChanges() {
    if (this.raceParticipants) {
      // Generate car brands
      const carBrands = {};

      this.raceParticipants.forEach((rParticipant: RaceParticipant) => {
        carBrands[rParticipant.car.brand] = rParticipant.car.brand;
      });

      this.carBrands = lodash.values(carBrands);
    }
  }

  nextUIMode() {
    const nextMode = (this.currentMode + 1) % (MAX_UI_MODES_COUNT - 1); // TODO: REVIEW THIS

    this.onChangeMode(nextMode);
  }

  onChangeMode(mode: number) {
    this.currentMode = mode;
  }

  onCarBrandsVisibilityChange(visibility: any) {
    const invisibleCarBrands = visibility.invisible,
      dimmedCarBrands = visibility.dimmed,
      markedCarBrands = visibility.marked;

    this.raceParticipants.forEach((rParticipant: RaceParticipant) => {
      if (invisibleCarBrands.indexOf(rParticipant.car.brand) >= 0) {
        // hide rParticipant
        this.store.dispatch(new HideRaceParticipant(rParticipant.number));
      } else if (dimmedCarBrands.indexOf(rParticipant.car.brand) >= 0) {
        // dim rParticipant
        this.store.dispatch(new DimRaceParticipant(rParticipant.number));
      } else if (markedCarBrands.indexOf(rParticipant.car.brand) >= 0) {
        // mark rParticipant
        this.store.dispatch(new MarkRaceParticipant(rParticipant.number));
      } else {
        // show rParticipant
        this.store.dispatch(new ShowRaceParticipant(rParticipant.number));
      }
    });
  }

  onSearchKeydownEnter(_event: any) {
    const raceParticipantFounds: RaceParticipant[] = [];

    this.raceParticipants.forEach((rParticipant: RaceParticipant) => {
      if (this.checkRaceParticipant(rParticipant, this.searchText)) {
        raceParticipantFounds.push(rParticipant);
      } else if (this.markedRaceParticipantNumbers.indexOf(rParticipant.number) < 0 &&
        this.invisibleRaceParticipantNumbers.indexOf(rParticipant.number) < 0) {
        this.store.dispatch(new DimRaceParticipant(rParticipant.number));
      }
    });

    if (raceParticipantFounds.length > 0) {
      raceParticipantFounds.forEach((rParticipant: RaceParticipant) => {
        // mark raceParticipantFound
        this.store.dispatch(new MarkRaceParticipant(rParticipant.number));
      });

      this.searchText = '';
    }
  }

  private checkRaceParticipant(rParticipant: RaceParticipant, searchText: string): boolean {
    let response = false;
    const value = rParticipant.number.toString();
    const searchTextArray = searchText ? searchText.split(' ') : [''];

    searchTextArray.forEach((sText: string) => {
      response = response || value === sText;
    });

    return response;
  }
}
