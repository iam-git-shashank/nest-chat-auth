import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import Users from "../../user/entities/user.entity";

// post.entity.ts
@Entity()
export class Post {
  @PrimaryKey()
  id: number;

  @Property()
  content: string;
  @Property()
  imageUrl?: string;

  @ManyToOne(() => Users)
  author: Users;

  @Property()
  createdAt = new Date();
}
