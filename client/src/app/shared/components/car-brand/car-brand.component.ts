// angular
import { Component, Input, OnChanges } from '@angular/core';

// models
import {
  Car
} from '../../../shared/model/';

@Component({
  selector: 'racer-car-brand',
  templateUrl: './car-brand.component.html'
})
export class CarBrandComponent implements OnChanges {
  @Input() car: Car;
  @Input() size = 'large';

  constructor() { }

  ngOnChanges() {
  }
}
