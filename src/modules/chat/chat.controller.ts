// src/message/message.controller.ts
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetUser } from '../auth/get-user.decorator'; // custom decorator to get user from token
@Controller('messages')
// @UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: ChatService) {}

  @Get('/:userId/:with')
  async getMessages(
    @Param('userId') userId: number,
    @Param('with') partnerId: number,
  ) {
    return this.messageService.getMessagesBetween(userId, partnerId);
  }
}
