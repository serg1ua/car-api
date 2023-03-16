import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(@InjectRepository(Manufacturer) private readonly manufacturerRepository: Repository<Manufacturer>) {}

  async createManufacturer(name: string): Promise<Manufacturer> {
    try {
      const result = await this.manufacturerRepository.findOneBy({ name });

      if (result) {
        return result;
      }

      const newManufacturer = {
        name,
        phone: null,
        siret: null
      };
      const manufacturer = this.manufacturerRepository.create(newManufacturer);
      return await this.manufacturerRepository.save(manufacturer);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong, while creating manufacturer', { cause: error });
    }
  }

  async updateManufacturer(id: number, dto: UpdateManufacturerDto): Promise<number> {
    try {
      const result = await this.manufacturerRepository.update(id, dto);
      if (result?.affected) {
        return result.affected;
      }
      throw new NotFoundException(`Manufacturer with id ${id} is nor found`);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong, while fetching manufacturer', { cause: error });
    }
  }
}
