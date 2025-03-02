import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class OrderItemDto {
  @IsString()
  productId: string;

  @IsNumber()
  @IsPositive()
  public quantity: number;

  @IsInt()
  @IsPositive()
  public price: number;

  @IsBoolean()
  @IsOptional()
  public status: boolean = true;
}
