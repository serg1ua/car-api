import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';

describe('Manufacturer Controller Test', () => {
  let manufacturerController: ManufacturerController;
  let manufacturerService: ManufacturerService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturerController],
      providers: [
        {
          provide: ManufacturerService,
          useValue: {
            updateManufacturer: jest.fn(),
          },
        },
      ],
    }).compile();

    manufacturerService = moduleRef.get<ManufacturerService>(
      ManufacturerService,
    );
    manufacturerController = moduleRef.get<ManufacturerController>(
      ManufacturerController,
    );
  });

  it('should be defined', () => {
    expect(manufacturerService).toBeDefined();
    expect(manufacturerController).toBeDefined();
  });

  it('should update a manufacturer', async () => {
    const expectedResult = 1;

    jest
      .spyOn(manufacturerService, 'updateManufacturer')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await manufacturerController.updateManufacturer(1, { phone: '1 (800) xxx xx xx', siret: 123 });

    expect(result).toBe(expectedResult);
  });
});
