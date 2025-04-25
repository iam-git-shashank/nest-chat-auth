// src/message/message.module.ts
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageController } from './chat.controller';
import { AuthenticationModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Message } from './entities/chat.entity';
import { ChatGateway } from './chat.gateway';
import Users from '../user/entities/user.entity';

@Module({
  providers: [ChatService, ChatGateway],
  controllers: [MessageController],
  imports: [
    AuthenticationModule,
    MikroOrmModule.forFeature([Message,Users]),
  ],
  exports:[ChatService]
})
export class MessageModule {}
