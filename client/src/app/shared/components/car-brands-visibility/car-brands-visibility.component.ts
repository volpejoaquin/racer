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
  RaceParticipant,
  CarBrand
} from '../../../shared/model/';

@Component({
  selector: 'racer-car-brands-visibility',
  templateUrl: './car-brands-visibility.component.html',
  styleUrls: ['./car-brands-visibility.component.scss']
})
export class CarBrandsVisibilityComponent implements OnInit, OnChanges {
  @Input() currentMode = 0;
  @Input() searchText = '';

  carBrands: CarBrand[] = lodash.values(CarBrand);


  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ngOnChanges(_simpleChanges: SimpleChanges) {
    // if (simpleChanges && simpleChanges.currentMode && !simpleChanges.currentMode.firstChange) {
    //   setTimeout(() => {
    //     const modeChanged = simpleChanges.currentMode.previousValue !== simpleChanges.currentMode.currentValue;
    //     this.checkState(modeChanged);
    //   }, 100); // TODO: REVIEW THIS
    // }
  }

  onCarBrandClick(carBrand: CarBrand) {
    console.log(carBrand);
  }

  isCarBrandInvisible(_carBrand: CarBrand) {
    return false;
  }

  isCarBrandDimmed(_carBrand: CarBrand) {
    return false;
  }

  isCarBrandMarked(_carBrand: CarBrand) {
    return false;
  }

  // private changeRaceParticipantVisibility(raceParticipantNumber: number) {
  //   if (this.isRaceParticipantNumberInvisible(raceParticipantNumber)) {
  //     this.showRaceParticipant(raceParticipantNumber);
  //   } else if (this.isRaceParticipantNumberDimmed(raceParticipantNumber)) {
  //     this.hideRaceParticipant(raceParticipantNumber);
  //   } else if (this.isRaceParticipantNumberMarked(raceParticipantNumber)) {
  //     this.dimRaceParticipant(raceParticipantNumber);
  //   } else {
  //     this.markRaceParticipant(raceParticipantNumber);
  //   }
  // }

  // private isRaceParticipantNumberInvisible(raceParticipantNumber: number) {
  //   return this.invisibleRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  // }

  // private isRaceParticipantNumberDimmed(raceParticipantNumber: number) {
  //   return this.dimmedRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  // }

  // private isRaceParticipantNumberMarked(raceParticipantNumber: number) {
  //   return this.markedRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0;
  // }

  // private showRaceParticipant(raceParticipantNumber: number) {
  //   this.store.dispatch(new ShowRaceParticipant(raceParticipantNumber));
  // }

  // private hideRaceParticipant(raceParticipantNumber: number) {
  //   this.store.dispatch(new HideRaceParticipant(raceParticipantNumber));
  // }

  // private dimRaceParticipant(raceParticipantNumber: number) {
  //   this.store.dispatch(new DimRaceParticipant(raceParticipantNumber));
  // }

  // private markRaceParticipant(raceParticipantNumber: number) {
  //   this.store.dispatch(new MarkRaceParticipant(raceParticipantNumber));
  // }

  // private checkState(modeChanged = true) {
  //   this.raceParticipants.forEach((raceParticipant: RaceParticipant) => {
  //     const raceParticipantNumber = lodash.toNumber(raceParticipant.number);

  //     if (this.currentMode === 0) {
  //       this.showRaceParticipant(raceParticipantNumber);
  //     } else if (this.currentMode === 1) {
  //       if (this.teamRaceParticipantNumbers.indexOf(raceParticipantNumber) >= 0) {
  //         this.markRaceParticipant(raceParticipantNumber);
  //       } else {
  //         this.dimRaceParticipant(raceParticipantNumber);
  //       }
  //     } else if (this.currentMode === 2 && !modeChanged) {
  //       this.changeRaceParticipantVisibility(raceParticipantNumber);
  //     }
  //   });
  // }
}
