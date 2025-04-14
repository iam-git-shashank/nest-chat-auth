import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { TraineeModule } from './modules/training/training.module';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/chat/chat.module';
import { ChatGateway } from './modules/chat/chat.gateway';
import { AuthenticationModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    EmployeeModule,
    ConfigModule.forRoot({
      isGlobal: true,
     
    }),
    TraineeModule,
    UserModule,
    MessageModule,
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
