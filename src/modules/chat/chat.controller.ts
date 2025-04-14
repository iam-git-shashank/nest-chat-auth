// src/message/message.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetUser } from '../auth/get-user.decorator'; // custom decorator to get user from token
@Controller('messages')
// @UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: ChatService) {}

  @Get()
  async getMessages(
    @GetUser('id') userId: number,
    @Query('with') otherUserId: number,
  ) {
    return this.messageService.getMessagesBetween(userId, otherUserId);
  }
}
