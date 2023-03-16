import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { Owner } from './owner.entity';

describe('Owner Controller Test', () => {
  let ownerController: OwnerController;

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
  });

  it('should be defined', () => {
    expect(OwnerService).toBeDefined();
    expect(OwnerController).toBeDefined();
  });

  it('should create new owner', async () => {
    const expectedResult = {} as Owner;
    jest
      .spyOn(ownerController, 'createOwner')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await ownerController.createOwner({ name: 'John Doe', carId: 1 });

    expect(result).toBe(expectedResult);
  });
});
