import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  manufacturerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
