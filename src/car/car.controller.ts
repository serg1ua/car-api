import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Put, Post, Delete, Body, Param } from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getCars(): Promise<Car[]> {
    return this.carService.getCars();
  }

  @Get(':id')
  async getCarById(@Param('id') id: number): Promise<Car> {
    return this.carService.getCarById(id);
  }

  @Get(':id/manufacturer')
  async getCarManufacturer(@Param('id') id: number): Promise<Manufacturer> {
    return this.carService.getCarManufacturer(id);
  }

  @Post('create')
  async createCar(@Body() dto: CreateCarDto): Promise<Car> {
    return this.carService.createCar(dto);
  }

  @Put(':id')
  async updateCar(@Param('id') id: number, @Body() dto: UpdateCarDto): Promise<number> {
    return this.carService.updateCar(id, dto);
  }

  @Delete(':id')
  async deleteCar(@Param('id') id: number): Promise<number> {
    return this.carService.deleteCar(id);
  }
}
