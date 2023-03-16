import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Owner } from './owner.entity';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Post()
  async createOwner(@Body() dto: CreateOwnerDto): Promise<Owner> {
    return this.ownerService.createOwner(dto);
  }
}
