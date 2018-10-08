import { BaseModel } from './base.model';

export interface Team extends BaseModel {
  // Simple
  name: string;
}

export enum CarBrand {
  fordKa = 'fordKa',
  fordKinetic = 'fordKinetic',
  chevroletCorsa = 'chevroletCorsa',
  chevroletCelta = 'chevroletCelta',
  chevroletOnix = 'chevroletOnix',
  fiatUno = 'fiatUno',
  fiatPalio = 'fiatPalio',
  fiatPunto = 'fiatPunto',
  renaultClio = 'renaultClio',
  volkswagenTrend = 'volkswagenTrend',
  renault206 = 'renault206',
  toyotaEtios = 'toyotaEtios',
  citroenDS3 = 'citroenDS3'
}

export interface Car extends BaseModel {
  // Simple
  name: string;
  brand: CarBrand;
}

export interface Driver extends BaseModel {
  // Simple
  name: string;
  last_name: string;
}

export interface RaceParticipant extends BaseModel {
  // Relationships
  team: Team;
  car: Car;
  driver: Driver;
  number: number;
}
