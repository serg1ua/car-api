import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from '../car/car.entity';

@Entity('manufacturer')
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  siret: number;

  @OneToMany(
    () => Car,
    (car: Car) => car.manufacturer,
  )
  cars: Car[];
}
