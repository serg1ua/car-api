import { Repository, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CarService } from '../car/car.service';
import { Owner } from './owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly carService: CarService,
    @InjectRepository(Owner) private readonly ownerRepository: Repository<Owner>,
  ) {}

  async createOwner(dto: CreateOwnerDto): Promise<Owner> {
    const car = await this.carService.getCarById(dto.carId);

    const newOwner = {
      car,
      name: dto.name,
      purchaseDate: Date.now()
    };

    const owner = this.ownerRepository.create(newOwner);

    try {
      return await this.ownerRepository.save(owner);
    } catch (error) {
      throw new InternalServerErrorException('Error creating new owner', { cause: error });
    }
  }

  async removeOwners(): Promise<Owner[]> {
    const oneMonth = this.configService.get<number>('ONE_MONTH');
    const endMonth = this.configService.get<number>('END_MONTH');
    // find owners that made purchase over 18 months ago
    try {
      let owners = await this.ownerRepository.findBy({
        purchaseDate: LessThan(Date.now() - oneMonth * endMonth),
      });
      // bulk delete owners if found
      if (owners?.length) {
        owners = await this.ownerRepository.remove(owners);
      }
      return owners;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while deleting users', { cause: error });
    }
  }
}
