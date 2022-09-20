import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from 'class-validator'

export class ExchangeDto {
  @ApiProperty()
  @IsString()
  coinId: string;

  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty()
  @IsString()
  currency: string;
}