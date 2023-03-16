import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { Car } from '../car/car.entity';
import { CarService } from '../car/car.service';
import { Owner } from './owner.entity';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]),
    TypeOrmModule.forFeature([Car]),
    TypeOrmModule.forFeature([Manufacturer]),
  ],
  providers: [OwnerService, CarService, ManufacturerService],
  controllers: [OwnerController],
  exports: [OwnerService],
})
export class OwnerModule {}
