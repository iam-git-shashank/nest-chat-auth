// src/message/message.entity.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Message {
  @PrimaryKey()
  id!: number;

  @Property()
  senderId!: number;

  @Property()
  receiverId!: number;

  @Property()
  content!: string;

  @Property()
  createdAt: Date = new Date();
}
