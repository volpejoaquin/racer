import { EventEmitter } from '@angular/core';
// angular
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as lodash from 'lodash';

// modules
import * as fromRoot from '../../../core/reducers/';

// models
import {
  CarBrand
} from '../../../shared/model/';

@Component({
  selector: 'racer-car-brands-visibility',
  templateUrl: './car-brands-visibility.component.html',
  styleUrls: ['./car-brands-visibility.component.scss']
})
export class CarBrandsVisibilityComponent implements OnInit, OnChanges {
  @Input() carBrands: CarBrand[] = lodash.values(CarBrand);
  @Input() currentMode = 0;
  @Input() searchText = '';
  @Output() visibility = new EventEmitter<any>();

  invisibleCarBrands: CarBrand[] = [];
  dimmedCarBrands: CarBrand[] = [];
  markedCarBrands: CarBrand[] = [];


  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ngOnChanges(_simpleChanges: SimpleChanges) {
  }

  onCarBrandClick(carBrand: CarBrand) {
    this.changeCarBrandVisibility(carBrand);
  }

  isCarBrandInvisible(carBrand: CarBrand) {
    return this.invisibleCarBrands.indexOf(carBrand) >= 0;
  }

  isCarBrandDimmed(carBrand: CarBrand) {
    return this.dimmedCarBrands.indexOf(carBrand) >= 0;
  }

  isCarBrandMarked(carBrand: CarBrand) {
    return this.markedCarBrands.indexOf(carBrand) >= 0;
  }

  private changeCarBrandVisibility(carBrand: CarBrand) {
    if (this.isCarBrandInvisible(carBrand)) {
      this.showCarBrand(carBrand);
    } else if (this.isCarBrandDimmed(carBrand)) {
      this.hideCarBrand(carBrand);
    } else if (this.isCarBrandMarked(carBrand)) {
      this.dimCarBrand(carBrand);
    } else {
      this.markCarBrand(carBrand);
    }
  }

  private showCarBrand(carBrand: CarBrand) {
    this.invisibleCarBrands = lodash.remove(this.invisibleCarBrands, carBrand);
    this.dimmedCarBrands = lodash.remove(this.dimmedCarBrands, carBrand);
    this.markedCarBrands = lodash.remove(this.markedCarBrands, carBrand);

    this.emitEvent();
  }

  private hideCarBrand(carBrand: CarBrand) {
    this.invisibleCarBrands = lodash.remove(this.invisibleCarBrands, carBrand);
    this.dimmedCarBrands = lodash.remove(this.dimmedCarBrands, carBrand);
    this.markedCarBrands = lodash.remove(this.markedCarBrands, carBrand);

    this.invisibleCarBrands.push(carBrand);
    this.emitEvent();
  }

  private dimCarBrand(carBrand: CarBrand) {
    this.invisibleCarBrands = lodash.remove(this.invisibleCarBrands, carBrand);
    this.dimmedCarBrands = lodash.remove(this.dimmedCarBrands, carBrand);
    this.markedCarBrands = lodash.remove(this.markedCarBrands, carBrand);

    this.dimmedCarBrands.push(carBrand);
    this.emitEvent();
  }

  private markCarBrand(carBrand: CarBrand) {
    this.invisibleCarBrands = lodash.remove(this.invisibleCarBrands, carBrand);
    this.dimmedCarBrands = lodash.remove(this.dimmedCarBrands, carBrand);
    this.markedCarBrands = lodash.remove(this.markedCarBrands, carBrand);

    this.markedCarBrands.push(carBrand);
    this.emitEvent();
  }

  private emitEvent() {
    this.visibility.emit({
      invisible: this.invisibleCarBrands,
      dimmed: this.dimmedCarBrands,
      marked: this.markedCarBrands
    });
  }
}
