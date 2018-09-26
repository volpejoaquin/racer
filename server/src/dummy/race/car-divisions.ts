// models
import {
  CarCategory,
  CarDivision
} from './../../model/';

export const TP_CAR_CATEGORY: CarCategory = {
  name: 'Turismo pista',
  short_name: 'TP'
};

export const TP_C1_CAR_DIVISION: CarDivision = {
  name: 'CLASE 1',
  short_name: 'C1',
  car_category: TP_CAR_CATEGORY
}

export const TP_C2_CAR_DIVISION: CarDivision = {
  name: 'CLASE 2',
  short_name: 'C2',
  car_category: TP_CAR_CATEGORY
}

export const TP_C3_CAR_DIVISION: CarDivision = {
  name: 'CLASE 3',
  short_name: 'C3',
  car_category: TP_CAR_CATEGORY
}
