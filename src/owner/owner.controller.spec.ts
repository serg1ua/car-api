import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { Owner } from './owner.entity';

describe('Owner Controller Test', () => {
  let ownerController: OwnerController;
  let ownerService: OwnerService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
      providers: [
        {
          provide: OwnerService,
          useValue: {
            createOwner: jest.fn(),
            deleteOwner: jest.fn(),
          },
        },
      ],
    }).compile();

    ownerController = moduleRef.get<OwnerController>(OwnerController);
    ownerService = moduleRef.get<OwnerService>(OwnerService);
  });

  it('should be defined', () => {
    expect(OwnerService).toBeDefined();
    expect(OwnerController).toBeDefined();
  });

  it('should create new owner', async () => {
    const expectedResult = { id: 1, name: 'John Doe', purchaseDate: 0, car: {} } as Owner;
    jest
      .spyOn(ownerService, 'createOwner')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await ownerController.createOwner({ name: 'John Doe', carId: 1 });

    expect(result).toBe(expectedResult);
  });
});
