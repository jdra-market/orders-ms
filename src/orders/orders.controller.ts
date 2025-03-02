import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrdersDto } from './dto/create-orders.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrders')
  create(@Payload() createOrdersDto: CreateOrdersDto) {
    return this.ordersService.create(createOrdersDto);
  }

  @MessagePattern('findAllOrders')
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload() id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('updateOrder')
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: string) {
    return this.ordersService.remove(id);
  }
}
