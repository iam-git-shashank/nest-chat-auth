import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import Employee from './entities/employee.entity';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, SqlEntityRepository } from '@mikro-orm/mysql';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: EntityRepository<Employee>,
    private readonly em:EntityManager
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepo.create(createEmployeeDto);
    await this.em.flush()

    return employee
  }

  findAll() {
    return this.employeeRepo.findAll();
  }

  findOne(id: number) {
    return this.employeeRepo.findOne(id);
  }
  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
