import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, InternalServerErrorException, } from '@nestjs/common';
import { Car } from './car.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly manufacturerService: ManufacturerService,
  ) {}

  async getCars(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  async getCarById(id: number): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id });
    if (car) {
      return car;
    }
    throw new NotFoundException(`Car with id: ${id} is not found`);
  }

  async getCarManufacturer(id: number): Promise<Manufacturer> {
    const [car] = await this.carRepository.find({
      where: { id },
      select: ['id'],
      relations: ['manufacturer'],
      join: {
        alias: 'car',
        leftJoinAndSelect: {
          manufacturer: 'car.manufacturer',
        },
      },
    });
    if (car) {
      return car.manufacturer;
    }
    throw new NotFoundException(`Manufacturer for car with id: ${id} is not found`);
  }

  async createCar(dto: CreateCarDto): Promise<Car> {
    const manufacturer = await this.manufacturerService.createManufacturer(dto.manufacturerName);

    const newCar = {
      manufacturer,
      price: dto.price,
      firstRegistrationDate: Date.now()
    };
    const car = this.carRepository.create(newCar);

    try {
      return await this.carRepository.save(car);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong, while creating a car', { cause: error });
    }
  }

  async updateCar(id: number, dto: UpdateCarDto): Promise<number> {
    try {
      const result = await this.carRepository.update(id, dto);
      if (result?.affected) {
        return result.affected;
      }
      throw new NotFoundException(`Car with id: ${id} is not found`);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong, while handling update', { cause: error });
    }
  }

  async deleteCar(id: number): Promise<number> {
    try {
      const result = await this.carRepository.delete(id);
      if (result?.affected) {
        return result.affected;
      }
      throw new NotFoundException(`Car with id: ${id} is not found`);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong, while deleting a car', { cause: error });
    }
  }
}
