import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../services/users/users.service';
import GetAllUserService from '../../use-cases/GetAllUsers';
import CreateUserService from '../../use-cases/CreateUser';
import GetUserByIDService from '../../use-cases/GetUserByID';
import UpdateUserByIDService from '../../use-cases/UpdateUserByID';
import DeleteUserByIDService from '../../use-cases/DeleteUserByID';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    GetAllUserService,
    CreateUserService,
    GetUserByIDService,
    UpdateUserByIDService,
    DeleteUserByIDService,
  ],
  exports: [UsersService],

})
export class UsersModule {}
