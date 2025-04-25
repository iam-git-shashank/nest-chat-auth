import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Post } from "../../post/entitites/post.entity";
import Users from "../../user/entities/user.entity";


@Entity()
export class Comment {
  @PrimaryKey()
  id: number;

  @Property()
  text: string;

  @Property()
  createdAt = new Date();

  @ManyToOne(() => Users)
  author: Users; // Who wrote the comment

  @ManyToOne(() => Post)
  post: Post; // Which post this comment belongs to
}
