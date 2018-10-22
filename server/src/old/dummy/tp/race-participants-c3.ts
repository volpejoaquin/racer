// libs
import * as lodash from 'lodash';

// models
import { RaceParticipant, CarBrand } from './../../model/race-participant.model';

export const TP_C3_RACE_PARTICIPANTS_GROUP_A: RaceParticipant[] = [{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CORSA",
    brand: CarBrand.chevroletCorsa
  },
  driver: {
    name: "Gonzalo",
    last_name: "Antolin"
  },
  number: 9
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "DS3",
    brand: CarBrand.citroenDS3
  },
  driver: {
    name: "Dino",
    last_name: "Cassiano"
  },
  number: 19
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "ETIOS",
    brand: CarBrand.toyotaEtios
  },
  driver: {
    name: "Mauro",
    last_name: "Salvi"
  },
  number: 35
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Lucas",
    last_name: "Bagnera"
  },
  number: 3
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "ETIOS",
    brand: CarBrand.toyotaEtios
  },
  driver: {
    name: "Pablo",
    last_name: "Vuyovich"
  },
  number: 20
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "KINETIC",
    brand: CarBrand.fordKinetic
  },
  driver: {
    name: "Marcos",
    last_name: "Dagostino"
  },
  number: 7
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Ramiro",
    last_name: "Alcaine"
  },
  number: 13
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "ETIOS",
    brand: CarBrand.toyotaEtios
  },
  driver: {
    name: "Thiago",
    last_name: "Martinez"
  },
  number: 25
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Juan",
    last_name: "Benedetti"
  },
  number: 110
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "KINETIC",
    brand: CarBrand.fordKinetic
  },
  driver: {
    name: "Lucas",
    last_name: "Petracchini"
  },
  number: 26
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Tomás",
    last_name: "Sniechowski"
  },
  number: 14
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Horacio",
    last_name: "Evolo"
  },
  number: 113
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Federico",
    last_name: "Santos"
  },
  number: 15
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Esteban",
    last_name: "Cistola"
  },
  number: 68
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "TREND",
    brand: CarBrand.volkswagenTrend
  },
  driver: {
    name: "Joaquin",
    last_name: "Telo"
  },
  number: 42
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Matias",
    last_name: "Antolin"
  },
  number: 10
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Juan",
    last_name: "Kreitz"
  },
  number: 24
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Juan Cruz",
    last_name: "Talamona"
  },
  number: 1
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Pablo",
    last_name: "Mauri"
  },
  number: 74
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "KINETIC",
    brand: CarBrand.fordKinetic
  },
  driver: {
    name: "Pablo",
    last_name: "Rossi"
  },
  number: 77
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "KINETIC",
    brand: CarBrand.fordKinetic
  },
  driver: {
    name: "Tomas",
    last_name: "Fineschi"
  },
  number: 137
}];

export const TP_C3_RACE_PARTICIPANTS_GROUP_A_NUMBERS: number[] = lodash.map(TP_C3_RACE_PARTICIPANTS_GROUP_A, (data: RaceParticipant) => data.number);

export const TP_C3_RACE_PARTICIPANTS_GROUP_B: RaceParticipant[] = [{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Martín",
    last_name: "Fierros"
  },
  number: 47
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Fredy",
    last_name: "Lestard"
  },
  number: 85
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Renzo",
    last_name: "Cerretti"
  },
  number: 89
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "206",
    brand: CarBrand.renault206
  },
  driver: {
    name: "Jorge",
    last_name: "Possiel"
  },
  number: 18
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Marcelo",
    last_name: "Gonzalez"
  },
  number: 5
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "ETIOS",
    brand: CarBrand.toyotaEtios
  },
  driver: {
    name: "Juan",
    last_name: "Damiani"
  },
  number: 29
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Lucas",
    last_name: "Yerobi"
  },
  number: 2
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "ONIX",
    brand: CarBrand.chevroletOnix
  },
  driver: {
    name: "Rubén",
    last_name: "Loiacono"
  },
  number: 38
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Pablo",
    last_name: "Malizia"
  },
  number: 63
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Matias",
    last_name: "Signorelli"
  },
  number: 8
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Joaquin",
    last_name: "Volpe"
  },
  number: 80
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Emiliano",
    last_name: "Gonzalez"
  },
  number: 88
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Marcos",
    last_name: "Bobbio"
  },
  number: 91
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Nicolás",
    last_name: "Lago"
  },
  number: 41
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "PUNTO",
    brand: CarBrand.fiatPunto
  },
  driver: {
    name: "Leonel",
    last_name: "Giles"
  },
  number: 93
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Saul",
    last_name: "Eidilstein"
  },
  number: 23
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Juan",
    last_name: "Garavaglia"
  },
  number: 76
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "ETIOS",
    brand: CarBrand.toyotaEtios
  },
  driver: {
    name: "Marcelo",
    last_name: "Ferrera"
  },
  number: 114
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "ONIX",
    brand: CarBrand.chevroletOnix
  },
  driver: {
    name: "Jonathan",
    last_name: "Baldinelli"
  },
  number: 60
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "ONIX",
    brand: CarBrand.chevroletOnix
  },
  driver: {
    name: "Jorge",
    last_name: "Baliñas"
  },
  number: 22
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Ignacio",
    last_name: "Rodriguez"
  },
  number: 39
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Cristobal",
    last_name: "Riestra"
  },
  number: 152
},{
  team: {
    name: "DUMMY"
  },
  car: {
    name: "CLIO",
    brand: CarBrand.renaultClio
  },
  driver: {
    name: "Rodrigo",
    last_name: "Avale"
  },
  number: 86},
  {
    team: {
      name: "DUMMY"
    },
    car: {
      name: "CLIO",
      brand: CarBrand.renaultClio
    },
    driver: {
      name: "Fernando",
      last_name: "Moni"
    },
    number: 46
  },
  {
    team: {
      name: "DUMMY"
    },
    car: {
      name: "CLIO",
      brand: CarBrand.renaultClio
    },
    driver: {
      name: "Leonardo",
      last_name: "Rama"
    },
    number: 36
  },
  {
    team: {
      name: "DUMMY"
    },
    car: {
      name: "CLIO",
      brand: CarBrand.renaultClio
    },
    driver: {
      name: "Alberto",
      last_name: "Jaime"
    },
    number: 33
  }];

export const TP_C3_RACE_PARTICIPANTS_GROUP_B_NUMBERS: number[] = 
  lodash.map(TP_C3_RACE_PARTICIPANTS_GROUP_B, (data: RaceParticipant) => data.number);

export const TP_C3_RACE_PARTICIPANTS: RaceParticipant[] = TP_C3_RACE_PARTICIPANTS_GROUP_A.concat(TP_C3_RACE_PARTICIPANTS_GROUP_B);
export const TP_C3_RACE_PARTICIPANTS_NUMBERS: number[] = TP_C3_RACE_PARTICIPANTS_GROUP_A_NUMBERS.concat(TP_C3_RACE_PARTICIPANTS_GROUP_B_NUMBERS);
