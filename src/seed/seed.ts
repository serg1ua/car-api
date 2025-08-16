import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module';
import { CarService } from '../car/car.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { CARS, MANUFACTURERS } from './seed.data';

async function seed(): Promise<void> {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const logger = new Logger('Seeder');

  try {
    const manufacturerService = appContext.get(ManufacturerService);
    const carService = appContext.get(CarService);

    for (const manufacturer of MANUFACTURERS) {
      await manufacturerService.createManufacturer(manufacturer);
    }
    for (const car of CARS) {
      await carService.createCar(car);
    }

    logger.log('Seeding completed successfully');
  } catch (err) {
    logger.error('Seeding failed', err);
  } finally {
    await appContext.close();
  }
}

seed();
