import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterLoad } from 'typeorm';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Owner } from '../owner/owner.entity';
import config from '../config';

@Entity('car')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Manufacturer,
    (manufacturer: Manufacturer) => manufacturer.cars,
  )
  manufacturer: Manufacturer;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int8', nullable: false })
  firstRegistrationDate: number;

  @OneToMany(
    () => Owner,
    (owner: Owner) => owner.car,
    { cascade: true, eager: true },
  )
  owners: Owner[];

  @AfterLoad()
  getDiscount(): void {
    const { DISCOUNT, ONE_MONTH, START_MONTH, END_MONTH } = config();

    const timeInterval = Date.now() - this.firstRegistrationDate;

    // check period between 12 and 18 months
    if (
      timeInterval > ONE_MONTH * START_MONTH &&
      timeInterval < ONE_MONTH * END_MONTH
    ) {
      this.price = this.price - (this.price * DISCOUNT) / 100;
    }
  }
}
