import { CreateCarDto } from '../car/dto/create-car.dto';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

export const MANUFACTURERS: Array<Manufacturer['name']> = [
  'Honda',
  'Chrysler',
  'Audi',
  'Peugeot',
  'Land Rover',
];

export const CARS: Array<CreateCarDto> = [
  { manufacturerName: 'Honda', price: 20000 },
  { manufacturerName: 'Chrysler', price: 30000 },
  { manufacturerName: 'Audi', price: 20000 },
  { manufacturerName: 'Peugeot', price: 10000 },
  { manufacturerName: 'Land Rover', price: 15000 },
];
