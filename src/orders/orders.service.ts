import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { NATS_SERVICES } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { firstValueFrom } from 'rxjs';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger('OrdersService');

  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
    @Inject(NATS_SERVICES) private readonly client: ClientProxy,
  ) {}

  async create(createOrdersDto: CreateOrdersDto) {
    try {
      const ids = createOrdersDto.items.map((item) => item.productId);
      const products: any[] = await firstValueFrom(
        this.client.send('validateProducts', {
          ids,
        }),
      );
      const totalAmount = createOrdersDto.items.reduce((acc, orderItem) => {
        const price = products.find(
          (product) => product.id === orderItem.productId,
        ).price;
        return acc + price * orderItem.quantity;
      }, 0);

      const totalItems = createOrdersDto.items.reduce((acc, orderItem) => {
        return acc + orderItem.quantity;
      }, 0);

      // const orderItems = createOrdersDto.items.map((item) => {

      // });

      const order = await this.ordersRepo.save([
        {
          totalAmount: totalAmount,
          totalItems: totalItems,
          items: createOrdersDto.items.map((item) => {
            const objItem = new OrderItem();
            objItem.price = products.find(
              (product) => product.id === item.productId,
            ).price;
            objItem.productId = item.productId;
            objItem.quantity = item.quantity;
            return objItem;
          }),
        },
      ]);

      return order;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_GATEWAY,
        message: 'Check logs',
      });
    }
  }

  findAll() {
    return this.ordersRepo.find();
  }

  async findOne(id: string) {
    const order = await this.ordersRepo.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) {
      throw new RpcException({
        status: HttpStatus.BAD_GATEWAY,
        message: `Order with id ${id} not found`,
      });
    }
    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
      })),
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    // const order = await this.ordersRepo.preload({
    //   id: id,
    //   ...updateOrderDto,
    // });
    // if (!order) {
    //   throw new Error('order not found');
    // }
    // return this.ordersRepo.save(order);
    return 'delivered';
  }

  remove(id: string) {
    return this.ordersRepo.delete(id);
  }
}
