

import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
class Employee {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @Property()
  role: string;
}
export default Employee;
