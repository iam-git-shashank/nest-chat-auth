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
import Users from '../user/entities/user.entity';
import { use } from 'passport';
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: EntityRepository<Message>,
    private readonly em: EntityManager,

    private readonly authenticationService: AuthService,
    @InjectRepository(Users)
    private readonly userRepo: EntityRepository<Users>,
  ) {}
  async sendMessage(
    senderId: number,
    receiverId: number,
    content: string,
  ): Promise<Message> {
    const em = this.em.fork();
    const message = em.create(Message, {
      senderId,
      receiverId,
      content,
      createdAt: new Date(),
    });
    console.log(message);
    await em.persistAndFlush(message);
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
    const cookie = socket.handshake.headers.authorization;
    console.log('cook', cookie);
    const token = cookie?.split(' ')[1];
    if (!token) throw new WsException('Mssing token');
    const user =
      await this.authenticationService.getUserFromAuthenticationToken(token);

    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    console.log('myuser', user);
    return user;
  }

  async getMessagesBetween(
    userAId: number,
    userBId: number,
  ): Promise<Message[]> {
    const all_msgs = await this.messageRepo.find(
      {
        $or: [
          { senderId: userAId, receiverId: userBId },
          { senderId: userBId, receiverId: userAId },
        ],
      },
      { orderBy: { createdAt: 'ASC' } },
    );
    return all_msgs;
  }
}
