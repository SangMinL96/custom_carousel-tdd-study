export interface CarListItf {
  carClassId: number;
  carClassName: string;
  carModel: string;
  image: string;
  drivingDistance: number;
  year: number;
  price: number;
  discountPercent: number;
  regionGroups: string[];
  carTypeTags: string[];
}

export interface CarDetailItf {
  additionalOption: string[];
  capacity: number;
  carClassId: number;
  carClassName: string;
  carImage: string;
  carModel: string;
  fuel: string;
  gearbox: string;
  maker: string;
  safetyOption: string[];
}
