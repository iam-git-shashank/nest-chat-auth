// src/message/message.service.ts
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Message } from './entities/chat.entity';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
@Injectable()
export class ChatService {
  constructor(
    private readonly em: EntityManager,
    private readonly authenticationService: AuthService,
    @InjectRepository(Message)
    private messageRepo: EntityRepository<Message>,
  ) {}
  async sendMessage(
    senderId: number,
    receiverId: number,
    content: string,
  ): Promise<Message> {
    const message = this.messageRepo.create({
      senderId,
      receiverId,
      content,
      createdAt: new Date(),
    });
    await this.em.flush();
    return message;
  }
  async getConversation(user1Id: number, user2Id: number): Promise<Message[]> {
    return this.messageRepo.find(
      {
        $or: [
          { senderId: user1Id, receiverId: user2Id },
          { senderId: user2Id, receiverId: user1Id },
        ],
      },
      { orderBy: { createdAt: 'ASC' } },
    );
  }

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    if (!cookie) {
      throw new WsException('No authentication token found');
    }
    const { Authentication: authenticationToken } = parse(cookie);
    if (!authenticationToken) {
      throw new WsException('No authentication token found');
    }
    const user =
      await this.authenticationService.getUserFromAuthenticationToken(
        authenticationToken,
      );

    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async getMessagesBetween(
    userAId: number,
    userBId: number,
  ): Promise<Message[]> {
    const repo = this.em.getRepository(Message);

    return await repo.find(
      {
        $or: [
          { senderId: userAId, receiverId: userBId },
          { senderId: userBId, receiverId: userAId },
        ],
      },
      { orderBy: { createdAt: 'ASC' } },
    );
  }
}
