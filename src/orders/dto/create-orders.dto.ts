import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class CreateOrdersDto {
  @IsString()
  @IsOptional()
  public clientId: string;

  // @IsDate()
  // @IsOptional()
  // public date: Date;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
