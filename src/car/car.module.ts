import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Car } from './car.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
    TypeOrmModule.forFeature([Manufacturer]),
  ],
  controllers: [CarController],
  providers: [CarService, ManufacturerService],
  exports: [CarService],
})
export class CarModule {}
