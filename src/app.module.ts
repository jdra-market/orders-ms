import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    OrdersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'orders-db',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'ordersdb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
