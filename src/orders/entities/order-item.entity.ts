import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  productId: string;
  @Column('numeric')
  quantity: number;
  @Column('float')
  price: number;
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
