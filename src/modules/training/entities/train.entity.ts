import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
class Trainee {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @Property()
  url: string;
}
export default Trainee;
