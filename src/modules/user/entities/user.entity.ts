import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
class Users {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @Property()
  message: string;

  @Property({unique:true})
  email: string;
  @Property({ hidden: true })
  password: string;
}
export default Users;
