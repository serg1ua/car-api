import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
