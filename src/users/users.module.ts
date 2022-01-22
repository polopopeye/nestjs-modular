import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [ProductsModule],
  controllers: [CustomerController, UsersController, UserController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
