import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Car } from './car.entity';

describe('Car Controller Test', () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        {
          provide: CarService,
          useValue: {
            getCars: jest.fn(),
            createCar: jest.fn(),
            updateCar: jest.fn(),
            getCarById: jest.fn(),
            getCarManufacturer: jest.fn(),
            deleteCar: jest.fn(),
          },
        },
        { provide: ManufacturerService, useValue: {} },
      ],
    }).compile();

    carService = moduleRef.get<CarService>(CarService);
    carController = moduleRef.get<CarController>(CarController);
  });

  it('should be defined', () => {
    expect(carController).toBeDefined();
    expect(carService).toBeDefined();
  });

  it('should return all cars', async () => {
    const expectedResult = [] as Car[];
    jest
      .spyOn(carService, 'getCars')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await carController.getCars();

    expect(result).toBe(result);
  });

  it('should return a car', async () => {
    const expectedResult = {} as Car;
    jest
      .spyOn(carService, 'getCarById')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await carController.getCarById(1);

    expect(expectedResult).toBe(result);
  });

  it('should return a car manufacturer', async () => {
    const expectedResult = {} as Manufacturer;
    jest
      .spyOn(carService, 'getCarManufacturer')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await carController.getCarManufacturer(1);

    expect(result).toBe(expectedResult);
  });

  it('should create a car', async () => {
    const expectedResult = {} as Car;
    jest
      .spyOn(carService, 'createCar')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await carController.createCar({ manufacturerName: 'Ford', price: 1200 });

    expect(result).toBe(expectedResult);
  });

  it('should update a car', async () => {
    const expectedResult = 1;
    jest
      .spyOn(carService, 'updateCar')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await carController.updateCar(1, { price: 1000 });

    expect(result).toBe(expectedResult);
  });

  it('should delete a car', async () => {
    const expectedResult = 1;
    jest
      .spyOn(carService, 'deleteCar')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await carController.deleteCar(1);

    expect(result).toBe(expectedResult);
  });
});
