import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Post } from "../../post/entitites/post.entity";
import Users from "../../user/entities/user.entity";

@Entity()
export class Likes {
  @PrimaryKey()
  id: number;

  @ManyToOne(() => Users)
  user: Users; // Who liked the post

  @ManyToOne(() => Post)
  post: Post; // Which post was liked

  @Property()
  createdAt = new Date();
}
