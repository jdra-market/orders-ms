import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), NatsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
