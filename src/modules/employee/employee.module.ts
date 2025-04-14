import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Employee from './entities/employee.entity'

@Module({
  imports: [MikroOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}