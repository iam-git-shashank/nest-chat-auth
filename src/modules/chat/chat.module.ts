// src/message/message.module.ts
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageController } from './chat.controller';
import { AuthenticationModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ChatService],
  controllers: [MessageController],
  imports: [AuthenticationModule, UserModule],
})
export class MessageModule {}
