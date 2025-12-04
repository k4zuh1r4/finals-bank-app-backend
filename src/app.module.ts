import { Module } from '@nestjs/common';
import { UsersModule } from './users/modules/users/users.module';
import { UsersController } from './users/controller/users/users.controller';
import { ConfigModule} from '@nestjs/config';
import { DatabaseModule } from './external/database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    DatabaseModule
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
