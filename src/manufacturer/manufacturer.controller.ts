import { Controller, Put, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManufacturerService } from './manufacturer.service';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@ApiTags('Manufacturer')
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private manufacturersService: ManufacturerService) {}

  @Put(':id')
  async updateManufacturer(@Param('id') id: number, @Body() dto: UpdateManufacturerDto): Promise<number> {
    return this.manufacturersService.updateManufacturer(id, dto);
  }
}
