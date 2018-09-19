// models
import {
  CarCategory,
  CarDivision
} from './../../model/';

export const CAR_CATEGORY_SAMPLE: CarCategory = {
  name: 'Turismo pista',
  short_name: 'TP'
};

export const CAR_DIVISION_SAMPLE: CarDivision = {
  name: 'CLASE 3',
  short_name: 'C3',
  car_category: CAR_CATEGORY_SAMPLE
}