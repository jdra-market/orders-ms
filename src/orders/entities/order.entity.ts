import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus, OrderStatusList } from '../enum/order-status.enum';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('float')
  totalAmount: number;
  @Column('numeric')
  totalItems: number;
  @Column('enum', { enum: OrderStatusList, default: OrderStatusList[0] })
  status: OrderStatus;
  @Column('boolean', { default: false, nullable: true })
  paid: boolean;
  @Column('date', { nullable: true })
  paidAt: Date;
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: OrderItem[];
}
