import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateManufacturerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  phone: string | null;

  @ApiPropertyOptional()
  @IsNumber()
  siret: number | null;
}
