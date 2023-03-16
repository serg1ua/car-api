import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Car } from '../car/car.entity';

@Entity('owner')
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int8', nullable: false })
  purchaseDate: number;

  @ManyToOne(
    () => Car,
    car => car.owners,
    { onDelete: 'CASCADE' },
  )
  car: Car;
}
