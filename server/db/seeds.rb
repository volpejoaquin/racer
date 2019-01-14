require 'ffaker'

# CATEGORY AND DIVISIONS
TP_CAR_CATEGORY = CarCategory.create(
  name: 'Turismo pista',
  short_name: 'TP'
)

TP_C1_CAR_DIVISION = CarDivision.create(
  name: 'CLASE 1',
  short_name: 'C1',
  car_category: TP_CAR_CATEGORY
)

TP_C2_CAR_DIVISION = CarDivision.create(
  name: 'CLASE 2',
  short_name: 'C2',
  car_category: TP_CAR_CATEGORY
)

TP_C3_CAR_DIVISION = CarDivision.create(
  name: 'CLASE 3',
  short_name: 'C3',
  car_category: TP_CAR_CATEGORY
)

# RACE WEEKENDS
RaceWeekend.create(
	name: 'Fecha 01',
	race_number: 1,
	start_date: DateTime.parse('01/03/2019 9:00'),
	end_date: DateTime.parse('03/03/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)

RaceWeekend.create(
	name: 'Fecha 02',
	race_number: 2,
	start_date: DateTime.parse('29/03/2019 9:00'),
	end_date: DateTime.parse('31/03/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)

RaceWeekend.create(
	name: 'Fecha 03',
	race_number: 3,
	start_date: DateTime.parse('03/05/2019 9:00'),
	end_date: DateTime.parse('05/05/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)

RaceWeekend.create(
	name: 'Fecha 04',
	race_number: 4,
	start_date: DateTime.parse('14/03/2019 9:00'),
	end_date: DateTime.parse('16/06/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)

RaceWeekend.create(
	name: 'Fecha 05',
	race_number: 5,
	start_date: DateTime.parse('12/07/2019 9:00'),
	end_date: DateTime.parse('14/07/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)

RaceWeekend.create(
	name: 'Fecha 06',
	race_number: 6,
	start_date: DateTime.parse('03/08/2019 9:00'),
	end_date: DateTime.parse('25/08/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)

RaceWeekend.create(
	name: 'Fecha 07',
	race_number: 7,
	start_date: DateTime.parse('20/09/2019 9:00'),
	end_date: DateTime.parse('22/09/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)

RaceWeekend.create(
	name: 'Fecha 08',
	race_number: 8,
	start_date: DateTime.parse('18/10/2019 9:00'),
	end_date: DateTime.parse('20/10/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)

RaceWeekend.create(
	name: 'Fecha 09',
	race_number: 9,
	start_date: DateTime.parse('15/11/2019 9:00'),
	end_date: DateTime.parse('17/11/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)

RaceWeekend.create(
	name: 'Fecha 10',
	race_number: 10,
	start_date: DateTime.parse('13/12/2019 9:00'),
	end_date: DateTime.parse('15/12/2019 13:00'),
	car_category: TP_CAR_CATEGORY
)