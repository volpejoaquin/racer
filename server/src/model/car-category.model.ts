export interface CarCategory {
  // Simple
  name: string;
  short_name: string;
}

export interface CarDivision {
  // Simple
  name: string;
  short_name: string;
  car_category: CarCategory;
}
