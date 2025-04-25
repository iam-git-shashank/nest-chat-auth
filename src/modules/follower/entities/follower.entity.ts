import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import Users from '../../user/entities/user.entity';

@Entity()
class Follower {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Users)
  follower!: Users;

  @ManyToOne(() => Users)
  following!: Users;
}
export default Follower;
