import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
class Users {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @Property()
  message: string;

  @Property()
  email: string;
  @Property()
  password: string;
}
export default Users;
